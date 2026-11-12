// Zero-dependency backend proxy so your React/Next/Flutter frontend never holds the API key.
//
//   node server/foodoscope-proxy.mjs                  # listens on http://localhost:5050
//   frontend:  fetch("http://localhost:5050/api/recipe2-api/recipe/recipeofday")
//
// It forwards /api/<anything> to the FoodoScope gateway with your key attached, caches GET
// responses in memory (saves your team's and everyone's rate limit), and adds CORS headers.
// Using Express? Copy the handler logic into an `app.use("/api", ...)` route.

import http from "node:http";
import { Foodoscope, FoodoscopeError } from "../starter/js/foodoscope.mjs";

const PORT = Number(process.env.PORT || 5050);
const fs = new Foodoscope();           // disk cache in .foodoscope_cache/
const ALLOWED = /^\/(recipe2-api|flavordb|cocktaildb)\//;

http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  const url = new URL(req.url, "http://x");
  const path = url.pathname.replace(/^\/api/, "");
  if (!url.pathname.startsWith("/api/") || !ALLOWED.test(path)) {
    return res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "Use /api/recipe2-api/..., /api/flavordb/... or /api/cocktaildb/..." }));
  }
  try {
    const params = Object.fromEntries(url.searchParams);
    let data;
    if (req.method === "POST") {
      let raw = "";
      for await (const chunk of req) raw += chunk;
      data = await fs.post(path, raw ? JSON.parse(raw) : undefined, params);
    } else {
      data = await fs.get(path, params);
    }
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(data));
  } catch (e) {
    const status = e instanceof FoodoscopeError ? e.status : 500;
    res.writeHead(status, { "Content-Type": "application/json" }).end(JSON.stringify({ error: e.message }));
  }
}).listen(PORT, () => console.log(`FoodoScope proxy on http://localhost:${PORT}/api/...`));
