# client/

Put your frontend here (React / Next.js / Vite / Flutter / plain HTML).

Call **your own backend**, not the FoodoScope gateway, so your API key never ships to the browser:

```js
// with server/foodoscope-proxy.mjs running on :5050
const recipe = await fetch("http://localhost:5050/api/recipe2-api/recipe/recipeofday").then(r => r.json());
```

Delete this file once you add your app.
