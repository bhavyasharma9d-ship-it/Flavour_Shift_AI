// Minimal client for the FoodoScope API gateway (Fork-IT 2026). Node 18+ (built-in fetch).
//
//   import { Foodoscope } from "./foodoscope.mjs";
//   const fs = new Foodoscope();                 // reads FOODOSCOPE_API_KEY from env or .env
//   await fs.get("/recipe2-api/recipe/recipeofday");
//   await fs.get("/flavordb/food/by-alias", { food_pair: "Mango" });
//
// Adds the Bearer header, caches responses on disk, pauses when X-RateLimit-Remaining hits 0,
// and throws FoodoscopeError with the gateway's message on non-2xx responses.
// Keep this on a SERVER (Node/Express/Next API route). Don't ship your key to the browser.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DEFAULT_BASE_URL = "http://cosylab.iiitd.edu.in:6969";

function loadDotenv(path = ".env") {
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const k = line.slice(0, i).trim();
    if (!(k in process.env)) process.env[k] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
}

export class FoodoscopeError extends Error {
  constructor(status, message, url) {
    super(`[${status}] ${message} (${url})`);
    Object.assign(this, { status, url });
  }
}

export class Foodoscope {
  constructor({ apiKey, baseUrl, cacheDir = ".foodoscope_cache", timeoutMs = 30_000 } = {}) {
    loadDotenv();
    this.apiKey = (apiKey ?? process.env.FOODOSCOPE_API_KEY ?? "").trim();
    if (!this.apiKey) throw new Error("FOODOSCOPE_API_KEY is not set. Copy .env.example to .env and paste your key.");
    this.baseUrl = (baseUrl ?? process.env.FOODOSCOPE_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.cacheDir = cacheDir;
    this.timeoutMs = timeoutMs;
    this.pauseUntil = 0;
    if (cacheDir) mkdirSync(cacheDir, { recursive: true });
  }

  get(path, params = {}) { return this.#request("GET", path, params); }
  post(path, body, params = {}) { return this.#request("POST", path, params, body); }

  async #request(method, path, params, body) {
    const url = new URL(this.baseUrl + (path.startsWith("/") ? path : "/" + path));
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

    const cacheFile = this.cacheDir &&
      join(this.cacheDir, createHash("sha1").update(JSON.stringify([method, url.href, body ?? null])).digest("hex") + ".json");
    if (cacheFile && existsSync(cacheFile)) return JSON.parse(readFileSync(cacheFile, "utf8"));

    const wait = this.pauseUntil - Date.now();
    if (wait > 0) {
      console.warn(`[foodoscope] rate-limit budget used up, pausing ${Math.ceil(wait / 1000)}s ...`);
      await new Promise((r) => setTimeout(r, wait));
    }

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${this.apiKey}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining !== null && Number(remaining) <= 0) this.pauseUntil = Date.now() + 61_000;

    if (res.status === 429) throw new FoodoscopeError(429, "Rate limit exceeded (60 requests/min per account): blocked for about 1 min. Add caching / slow down.", url.href);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    if (!res.ok) throw new FoodoscopeError(res.status, (data && (data.error || data.message)) || res.statusText, url.href);

    if (cacheFile) writeFileSync(cacheFile, JSON.stringify(data));
    return data;
  }
}
