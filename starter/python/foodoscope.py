"""Minimal client for the FoodoScope API gateway (Fork-IT 2026).

    from foodoscope import Foodoscope
    fs = Foodoscope()                       # reads FOODOSCOPE_API_KEY from env or .env
    fs.get("/recipe2-api/recipe/recipeofday")
    fs.get("/flavordb/food/by-alias", food_pair="Mango")

What it does for you:
  * adds the `Authorization: Bearer <key>` header
  * caches responses on disk (data doesn't change during the event), so repeated calls are free
  * reads X-RateLimit-Remaining and pauses before you trigger a 5-minute block
  * raises FoodoscopeError with the gateway's message on any non-2xx response
"""
from __future__ import annotations

import hashlib
import json
import os
import pathlib
import time
from typing import Any

import requests

DEFAULT_BASE_URL = "http://cosylab.iiitd.edu.in:6969"


def _load_dotenv(path: str = ".env") -> None:
    """Tiny .env loader so you don't need python-dotenv. Existing env vars win."""
    for candidate in (pathlib.Path(path), pathlib.Path(__file__).resolve().parents[2] / path):
        if candidate.is_file():
            for line in candidate.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
            return


class FoodoscopeError(RuntimeError):
    def __init__(self, status: int, message: str, url: str):
        super().__init__(f"[{status}] {message} ({url})")
        self.status, self.message, self.url = status, message, url


class Foodoscope:
    def __init__(
        self,
        api_key: str | None = None,
        base_url: str | None = None,
        cache_dir: str | None = ".foodoscope_cache",  # None disables caching
        timeout: float = 30,
    ):
        _load_dotenv()
        self.api_key = (api_key or os.getenv("FOODOSCOPE_API_KEY", "")).strip()
        if not self.api_key:
            raise SystemExit("FOODOSCOPE_API_KEY is not set. Copy .env.example to .env and paste your key.")
        self.base_url = (base_url or os.getenv("FOODOSCOPE_BASE_URL") or DEFAULT_BASE_URL).rstrip("/")
        self.timeout = timeout
        self.cache = pathlib.Path(cache_dir) if cache_dir else None
        if self.cache:
            self.cache.mkdir(exist_ok=True)
        self.session = requests.Session()
        self.session.headers["Authorization"] = f"Bearer {self.api_key}"
        self._pause_until = 0.0

    def get(self, path: str, **params: Any) -> Any:
        return self._request("GET", path, params=params)

    def post(self, path: str, body: Any = None, **params: Any) -> Any:
        return self._request("POST", path, params=params, body=body)

    def _cache_file(self, method: str, url: str, params: dict, body: Any) -> pathlib.Path | None:
        if not self.cache:
            return None
        key = json.dumps([method, url, sorted(params.items()), body], sort_keys=True, default=str)
        return self.cache / (hashlib.sha1(key.encode()).hexdigest() + ".json")

    def _request(self, method: str, path: str, params: dict, body: Any = None) -> Any:
        url = self.base_url + (path if path.startswith("/") else "/" + path)
        cf = self._cache_file(method, url, params, body)
        if cf and cf.exists():
            return json.loads(cf.read_text(encoding="utf-8"))

        wait = self._pause_until - time.time()
        if wait > 0:
            print(f"[foodoscope] rate-limit budget used up, pausing {wait:.0f}s ...")
            time.sleep(wait)

        resp = self.session.request(method, url, params=params or None, json=body, timeout=self.timeout)

        remaining = resp.headers.get("X-RateLimit-Remaining")
        if remaining is not None and remaining.lstrip("-").isdigit() and int(remaining) <= 0:
            self._pause_until = time.time() + 61  # let the 1-minute window slide

        if resp.status_code == 429:
            raise FoodoscopeError(429, "Rate limit exceeded (60 requests/min per account): blocked for about 1 min. "
                                       "Add caching / slow down.", url)
        try:
            data = resp.json()
        except ValueError:
            data = resp.text
        if not resp.ok:
            if isinstance(data, dict):
                msg = data.get("error") or data.get("message")
            else:
                msg = str(data)[:200]
            raise FoodoscopeError(resp.status_code, msg or resp.reason, url)

        if cf:
            cf.write_text(json.dumps(data), encoding="utf-8")
        return data
