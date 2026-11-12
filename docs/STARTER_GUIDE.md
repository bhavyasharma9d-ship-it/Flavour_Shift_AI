# Fork-IT 2026 — Participant Starter Guide

**Fork-IT Challenge · ESYA'26 · IIIT-Delhi · 14–15 November 2026 (24 hours, offline)**

Everything you need to get from zero to your first API response in 10 minutes, and to submit on time.

| Need | Where |
|---|---|
| API gateway | `http://cosylab.iiitd.edu.in:6969` |
| Your API key | **One key per team.** One member registers on Foodoscope (we demo it at the event) and shares the key with teammates only. It starts with **100 tokens**. |
| Postman collections | [`postman/`](../postman) in this repo |
| Full endpoint list | [`API_REFERENCE.md`](API_REFERENCE.md) |
| Starter code | [`starter/python`](../starter/python) · [`starter/js`](../starter/js) |
| AI assistant (optional) | MCP server `http://cosylab.iiitd.edu.in:8765/mcp` for Claude Code / Cursor / Gemini CLI, same key. See §4 |
| Submission deadline | **Saturday 15 Nov, 06:00 AM IST. Hard stop.** |
| Help | Tech Help Desk, <location>, staffed all night |

---

## 1. Before you arrive

- [ ] Every team member has a GitHub account, and you sent us your usernames.
- [ ] Every member **accepted the invite** to the `Fork-IT-2026-Esya` GitHub organisation. Check your email or <https://github.com/orgs/Fork-IT-2026-Esya/invitation>.
- [ ] You can see your team repo: `Fork-IT-2026-Esya/forkit26-<team-id>-<team-slug>`.
- [ ] Postman (desktop app) or VS Code with the REST Client / Thunder Client extension installed.
- [ ] Python 3.9+ or Node 18+ installed, plus your stack's dependencies **pre-downloaded**. Campus Wi-Fi is shared by everyone.
- [ ] Chargers and extension boards.

> **Note:** The APIs are reachable **only from the IIIT-Delhi campus network**. If your key times out from home, that's expected. Prepare your stack, UI and ideas beforehand, and make your first API call on-site.

## 2. On-site network

The event Wi-Fi details are given **only on campus**, at the registration desk on 14 Nov. They are not shared by email. Port **6969** (the gateway) and **8765** (the MCP server) are open on this network. Report any issue to the Tech Help Desk.

## 3. Your API key

- Every request needs the header `Authorization: Bearer <YOUR_API_KEY>`.
- **Never commit the key.** Put it in `.env` (already in `.gitignore`). Leaked keys get revoked.
- Don't put the key in frontend JavaScript that ships to a browser. Building in React / Next / Flutter? Run the included zero-dependency proxy, `node server/foodoscope-proxy.mjs`, and have your frontend call `http://localhost:5050/api/recipe2-api/...`. The proxy attaches the key and caches responses for you.
- One key per team. Keys are tied to the registering member's account, logged, and **revoked on 20 Nov**.
- **Tokens:** each key starts with 100 tokens. Every successful (`2xx`) response costs 1 token; errors are free. Running low? Ask the Tech Help Desk for a top-up (top-ups are recorded).

## 4. Your first call (60 seconds)

**curl**
```bash
curl -H "Authorization: Bearer $FOODOSCOPE_API_KEY" \
  "http://cosylab.iiitd.edu.in:6969/recipe2-api/recipe/recipeofday"
```

**Python** (uses [`starter/python/foodoscope.py`](../starter/python/foodoscope.py))
```bash
cp .env.example .env    # then paste your key into .env
pip install requests
python starter/python/quickstart.py
```

**JavaScript / Node 18+** (uses [`starter/js/foodoscope.mjs`](../starter/js/foodoscope.mjs))
```bash
cp .env.example .env
node starter/js/quickstart.mjs
```

**Postman**
1. Import the three `*.postman_collection.json` files and `ForkIT_2026.postman_environment.json` from [`postman/`](../postman).
2. Pick the **ForkIT 2026** environment (top-right) and paste your key into `apiKey`.
3. Send any request. Every collection already uses `Bearer {{apiKey}}`.

**AI assistant (optional, MCP)**: lets Claude Code, Cursor or Gemini CLI call the APIs for you. Same key, 1 token per tool call (one question can trigger several). Campus network only.
```bash
claude mcp add -s user --transport http foodoscope http://cosylab.iiitd.edu.in:8765/mcp --header "Authorization: Bearer <YOUR_API_KEY>"
```
Cursor: `~/.cursor/mcp.json` → `{"mcpServers":{"foodoscope":{"url":"http://cosylab.iiitd.edu.in:8765/mcp","headers":{"Authorization":"Bearer <YOUR_API_KEY>"}}}}`. Gemini CLI: same in `~/.gemini/settings.json`, but `httpUrl` instead of `url`.

## 5. The APIs

All three APIs sit behind one gateway with one key.

| API | Base path | What's inside | Pagination |
|---|---|---|---|
| **RecipeDB 2** | `/recipe2-api` | Recipes from 26 world regions: ingredients, instructions, nutrition, micronutrients, diet tags, cooking methods, utensils, meal plans | `page` (starts at **1**), `limit` |
| **FlavorDB** | `/flavordb` | Flavour molecules: chemical properties, taste/aroma profiles, natural sources, food pairing | `page` (starts at **0**), `size` |
| **CocktailDB** 🔞 | `/cocktaildb` | Cocktail recipes, ingredients, substitutes, nutrition, ratings | `page` (starts at **1**), `page_size` |

> ⚠️ The three APIs use **different pagination parameter names**. Check this table before you debug "empty" results.

### Good first endpoints

| Try this | Endpoint |
|---|---|
| A random recipe | `GET /recipe2-api/recipe/recipeofday` |
| Search recipes by title | `GET /recipe2-api/recipe-bytitle/recipeByTitle?title=paneer&page=1&limit=10` |
| Recipes by diet | `GET /recipe2-api/recipe-diet/recipe-diet?diet=vegan&page=1&limit=10` |
| Recipes in a calorie range | `GET /recipe2-api/recipes-calories/calories?minCalories=200&maxCalories=500&page=1&limit=10` |
| Full recipe by id | `GET /recipe2-api/search-recipe/{id}` |
| Step-by-step instructions | `GET /recipe2-api/instructions/{recipe_id}` |
| Build a meal plan | `POST /recipe2-api/mealplan/meal-plan` |
| Similar recipes | `GET /recipe2-api/similar-recipes/{id}?by=process&page=1&limit=10` |
| What pairs with mango? | `GET /flavordb/food/by-alias?food_pair=Mango` |
| Molecules by flavour | `GET /flavordb/molecules_data/by-flavorProfile?flavor_profile=sweet-like&page=0&size=20` |
| Molecules in an ingredient | `GET /flavordb/entities/by-id/{id}/molecules-compact` |
| Recipe ↔ flavour links | `GET /recipe2-api/connections/links?ingredient=sugar&page=1&limit=5` |
| Cocktail by id 🔞 | `GET /cocktaildb/cocktailRecipe-search/cocktailDetails/{id}` |
| "What can I make with my bar?" 🔞 | `POST /cocktaildb/cocktailRecipe-search/myBar` |

All endpoints, with example parameters: [`API_REFERENCE.md`](API_REFERENCE.md). Request bodies for the `POST` endpoints are in the Postman collections.

## 6. Rate limits: please read

The gateway allows **60 requests per minute per account** (per API key). If you go over the limit, your key is **blocked for about 1 minute** (HTTP `429`). The gateway is shared by every team, so heavy use slows everyone down.

Be a good neighbour:

1. **Cache everything.** The data doesn't change during the hackathon. The starter clients cache to disk by default, so the second identical call costs nothing (no request, no token).
2. **Don't loop over thousands of ids live.** Pull what you need once, save it to JSON or SQLite, and build on that.
3. **No polling, no load tests, no scrapers.** Abuse gets your key revoked.
4. Watch the response headers `X-RateLimit-Limit` / `X-RateLimit-Remaining`. The starter clients pause automatically when `Remaining` hits 0, so you never trigger a block.
5. Use `limit` / `size` / `page_size` sensibly (10–50), not 10 000.

## 7. Known issues and slow endpoints

All 127 requests in the Postman collections (RecipeDB 30, FlavorDB 64, CocktailDB 33) were tested against the live APIs on 10–11 Nov 2026, and all returned data. Most respond in about 1 s.

| Endpoint | Note | Tip |
|---|---|---|
| `GET /cocktaildb/cocktailRecipe-search/metadata` | Can take 5–20 s | Fetch once and cache it |
| `GET /recipe2-api/category/` | About 4 s | Cache it |
| `GET /recipe2-api/recipes/range`, `/recipe2-api/recipe/recipeofday` | 2–4 s at times | Cache it |
| `GET /recipe2-api/recipebyingredient/by-ingredients-categories-title` | Slower when you stack many include/exclude filters | Use 1–2 filters, then filter the rest in your own code |
| CocktailDB `POST /myBar` | Only returns cocktails you can make **entirely** from your list | Send a realistic pantry (5+ ingredients) |
| CocktailDB `POST /nutritionSearch` | Body must be `{"filters": {"Calories": {"min": 50, "max": 300}}}` | See the Postman example |

Set your HTTP timeout to **20–30 s**, not the 5 s default many libraries use.

## 8. Error messages

| Status | Body says | Meaning / fix |
|---|---|---|
| `400` | `ApiKey is not provided` | Missing `Authorization` header, or it's not exactly `Bearer <key>` |
| `400` | `Only bearer token is allowed` | Use the word `Bearer`, not `Token` or `Basic` |
| `401` | `Invalid API key` | Typo, extra space or newline, or the key was revoked |
| `400` | `Not enough tokens` | Your key has used all its tokens. Ask the Help Desk for a top-up |
| `400` | `Account not verified` | Finish verifying your account, or come to the Help Desk |
| `429` | `Rate Limit Exceeded` | Over 60 requests in a minute. Wait about 1 min and add caching |
| `404` | — | Wrong path. Check the base path (`/recipe2-api`, `/flavordb`, `/cocktaildb`) |
| timeout | — | Endpoint is slow (see §7) or you're off the event network |

## 9. CocktailDB policy 🔞

CocktailDB contains alcoholic-beverage data. Under event policy it is **available only to teams in which every member is 18 or older and has been verified** by the organisers. Your shortlist email says whether your team is cleared.

- Not cleared? **Don't call `/cocktaildb` at all.** Any use, even in a demo, can lead to disqualification.
- Cleared? Present responsibly: no content that encourages excessive or underage drinking.

## 10. Your repo and submission

**Repo.** Every team gets one **private** repo in the `Fork-IT-2026-Esya` org, created from this template:

```
forkit26-<team-id>-<team-slug>      e.g.  forkit26-t07-byte-bandits
```

Don't create repos elsewhere for your submission. Only the org repo is judged.

**Rules**
- Write all code during the event (from the opening ceremony). Using libraries, frameworks and boilerplate is fine. Pre-built projects are not.
- **Commit early, commit often.** We look at commit history. One giant commit at 5:59 AM is a red flag.
- Disclose AI tools and third-party code in the README's *Acknowledgements* section.

**At 06:00 AM IST on 15 Nov your repo becomes read-only automatically.** Whatever is on the default branch (`main`) then is your submission.

**Submission checklist**, due **by 06:00 AM**:
- [ ] Code pushed to `main` in your org repo
- [ ] `README.md` filled in (template provided). No placeholder text left.
- [ ] Demo video (≤ 3 min) linked in the README
- [ ] No API keys or `.env` committed (`git log -p | grep -i bearer` should find nothing)
- [ ] **Submission form** filled in by your team lead: <SUBMISSION_FORM_LINK>
- [ ] (Optional) slides / live demo link in the README

Late form = no submission. The form closes at 06:00 AM sharp.

## 11. Getting help

- **Tech Help Desk**, <location>. Staffed all night (see the roster at the desk).
- Bring: your team id, the exact URL you called, the status code, and the response body.
- **Never share your API key in public channels.** Show it at the desk if asked.

Good luck, and have fun cooking. 🍳
