// Run from the repo root:  node starter/js/quickstart.mjs
import { Foodoscope, FoodoscopeError } from "./foodoscope.mjs";

const fs = new Foodoscope();
const show = (title, data) => console.log(`\n=== ${title}\n${JSON.stringify(data, null, 2).slice(0, 600)} ...`);

try {
  show("RecipeDB: recipe of the day", await fs.get("/recipe2-api/recipe/recipeofday"));
  show("RecipeDB: vegan recipes", await fs.get("/recipe2-api/recipe-diet/recipe-diet", { diet: "vegan", page: 1, limit: 3 }));
  show("FlavorDB: what pairs with mango", await fs.get("/flavordb/food/by-alias", { food_pair: "Mango" }));
  // CocktailDB: 18+ verified teams ONLY. Uncomment if your team is cleared.
  // show("CocktailDB: details", await fs.get("/cocktaildb/cocktailRecipe-search/cocktailDetails/100003"));
} catch (e) {
  if (e instanceof FoodoscopeError) console.error("API error:", e.message, "\nSee docs/STARTER_GUIDE.md section 8.");
  else throw e;
}
