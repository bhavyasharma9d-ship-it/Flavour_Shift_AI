"""Run from the repo root:  python starter/python/quickstart.py"""
import json

from foodoscope import Foodoscope, FoodoscopeError

fs = Foodoscope()


def show(title, data, n=600):
    print(f"\n=== {title}\n{json.dumps(data, indent=2, ensure_ascii=False)[:n]} ...")


try:
    show("RecipeDB: recipe of the day", fs.get("/recipe2-api/recipe/recipeofday"))
    show("RecipeDB: vegan recipes", fs.get("/recipe2-api/recipe-diet/recipe-diet", diet="vegan", page=1, limit=3))
    show("FlavorDB: what pairs with mango", fs.get("/flavordb/food/by-alias", food_pair="Mango"))
    # CocktailDB: 18+ verified teams ONLY. Uncomment if your team is cleared.
    # show("CocktailDB: details", fs.get("/cocktaildb/cocktailRecipe-search/cocktailDetails/100003"))
except FoodoscopeError as e:
    print("API error:", e)
    print("See docs/STARTER_GUIDE.md section 8 (error messages).")
