# FoodoScope API Reference — Fork-IT 2026

Base URL: `http://cosylab.iiitd.edu.in:6969` · Header on every request: `Authorization: Bearer <YOUR_API_KEY>`

Generated from the Postman collections in [`../postman`](../postman). Parameter values are examples; request bodies for `POST` endpoints are in Postman. Path segments like `:id` / `{id}` are placeholders.

## RecipeDB 2 (`/recipe2-api`) · pagination `page` (from 1) + `limit`

### GET Method

| Method | Endpoint | Description |
|---|---|---|
| GET | `/recipe2-api/recipe/recipesinfo?page=1&limit=10` | Recipe Info |
| GET | `/recipe2-api/recipe/recipeofday` | Recipe of Day |
| GET | `/recipe2-api/recipe/recipe-day/with-ingredients-categories?excludeIngredients=water,flour&excludeCategories=Dairy` | Recipe With Ingredients Categories |
| GET | `/recipe2-api/recipe-nutri/nutritioninfo?page=1&limit=10` | Recipe Nutrition Info |
| GET | `/recipe2-api/recipe-micronutri/micronutritioninfo?page=1&limit=10` | Recipe Micro Nutrition Info |
| GET | `/recipe2-api/recipes/range?field=total_time&min=30&max=60&page=1&limit=10` | Recipe Range |
| GET | `/recipe2-api/recipes_cuisine/cuisine/:region?continent=Asian&subRegion=Indian&field=total_time&min=30&max=60&page=1&limit=10` | Recipe By Cuisine |
| GET | `/recipe2-api/recipe-bytitle/recipeByTitle?title=Chicken&page=1&limit=10` | Recipe By Title |
| GET | `/recipe2-api/recipes-calories/calories?minCalories=100&maxCalories=500&page=1&limit=10` | Recipe By Calories |
| GET | `/recipe2-api/recipe/region-diet/region-diet?region=Scandinavian&diet=pescetarian&page=1&limit=10` | Recipe By Region Diet |
| GET | `/recipe2-api/recipe-diet/recipe-diet?diet=vegan&page=1&limit=10` | Recipe By Recipe Diet |
| GET | `/recipe2-api/recipe-carbo/recipes-by-carbs?minCarbs=10&maxCarbs=50&page=1&limit=10` | Recipe By Carbs |
| GET | `/recipe2-api/instructions/:recipe_id` | Recipe Instructions |
| GET | `/recipe2-api/ingredients/flavor/:flavor?page=1&limit=10` | Recipe By Ingredients Flavor |
| GET | `/recipe2-api/recipe-nutri-ingredient/nutritioninfo-by-ingredient?ingredient=garlic` | Nutrition By Ingredient |
| GET | `/recipe2-api/byutensils/utensils?utensils=frypan&page=1&limit=10` | Recipe By Utensils |
| GET | `/recipe2-api/recipes-method/:method?page=1&limit=10` | Recipe By Recipes Method |
| GET | `/recipe2-api/byenergy/energy?minEnergy=100&maxEnergy=800&page=1&limit=10` | Recipe By Energy |
| GET | `/recipe2-api/recipebyingredient/by-ingredients-categories-title?includeIngredients=lemon juice&excludeIngredients=butter&includeCategories=Vegetable&excludeCategories=Dairy&title=salad&page=1&limit=10` | Recipe By Ingredients Categories Title |
| GET | `/recipe2-api/category/?includeDietrxCategories=Vegetable&excludeDietrxCategories=Fish&page=1&limit=10` | Recipe By Category |
| GET | `/recipe2-api/search-recipe/:id` | Recipe By Id |
| GET | `/recipe2-api/protein/protein-range?min=10&max=50&page=1&limit=10` | Recipe By Protein Range |
| GET | `/recipe2-api/recipe-Day-category/?excludeDietrxCategories=Bakery&page=1&limit=10` | Recipe By Recipe Day Category |
| GET | `/recipe2-api/connections/links?ingredient=sugar&page=1&limit=5` | Get RecipeDB <> FlavorDB Links |
| GET | `/recipe2-api/connections/dropdowns?type=ingredient&search=gar&limit=20` | Get Dropdown Values |
| GET | `/recipe2-api/similar-recipes/:id?by=process&page=1&limit=10` | Get Similar Recipes |
| GET | `/recipe2-api/stats/category-heatmap?regions=26` | Category Heatmap |
| GET | `/recipe2-api/stats/overview` | Recipe Stats Overview |
| GET | `/recipe2-api/stats/ingredient-categories` | Ingredient Categories |

### POST Method

| Method | Endpoint | Description |
|---|---|---|
| POST | `/recipe2-api/mealplan/meal-plan` | Recipe Meal Plan |

## FlavorDB (`/flavordb`) · pagination `page` (from 0) + `size`

### Property Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/properties/taste-threshold?values=fruity&page=0&size=20` | Properties By Taste Threshold |
| GET | `/flavordb/properties/synthesis?values=acid&page=0&size=20` | Properties By Synthesis |
| GET | `/flavordb/properties/by-tradeAssociationGuidelines?guideline=0.390 mg&page=0&size=20` | Properties By Trade Association Guidelines |
| GET | `/flavordb/properties/by-naturalOccurrence?occurrence=Dandelion&page=0&size=20` | Properties By Natural Occurrence |
| GET | `/flavordb/properties/by-nas-range?min=21&max=8811&page=0&size=20` | Properties By Nas Range |
| GET | `/flavordb/properties/by-jecfa-range?min=1&max=1897&page=0&size=20` | Properties By Jecfa Range |
| GET | `/flavordb/properties/by-iofi-categorisation?category=Artificial&page=0&size=20` | Properties By Iofi Categorisation |
| GET | `/flavordb/properties/by-flNo-range?min=1.001&max=56.000&page=0&size=20` | Properties By Fl No Range |
| GET | `/flavordb/properties/by-fema-range?min=2001&max=4905&page=0&size=20` | Properties By Fema Range |
| GET | `/flavordb/properties/by-einecs?einecs_no=232-519-5&page=0&size=20` | Properties By Einecs |
| GET | `/flavordb/properties/by-description?desc=sweet&page=0&size=20` | Properties By Description |
| GET | `/flavordb/properties/by-coe-range?min=2&max=2100&page=0&size=20` | Properties By Coe Range |
| GET | `/flavordb/properties/by-coe-approval?coe_approval=beverages&page=0&size=20` | Properties By Coe Approval |
| GET | `/flavordb/properties/by-aromaThresholdValues?threshold=100 ppb&page=0&size=20` | Properties By Aroma Threshold Values |
| GET | `/flavordb/properties/by-coe?coe_no=570&page=0&size=20` | Properties By Coe |
| GET | `/flavordb/properties/by-fema?fema_no=2005&page=0&size=20` | Properties By Fema |
| GET | `/flavordb/properties/by-flNo?fl_no=7.038&page=0&size=20` | Properties By Fl No |
| GET | `/flavordb/properties/by-nas?nas_no=2005&page=0&size=20` | Properties By Nas |
| GET | `/flavordb/properties/by-jecfa?jecfa_no=810&page=0&size=20` | Properties By Jecfa |

### More Property Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/more_properties/by-surfaceArea-range?min=24.63&max=1000.00&page=0&size=20` | Properties By Surface Area Range |
| GET | `/flavordb/more_properties/by-rotatableBonds-range?min=0&max=40&page=0&size=20` | Properties By Rotatable Bonds Range |
| GET | `/flavordb/more_properties/by-numberOfAtoms-range?min=1&max=150&page=0&size=20` | Properties By Number Of Atoms Range |
| GET | `/flavordb/more_properties/by-numRings-range?min=0&max=10&page=0&size=20` | Properties By Num Rings Range |
| GET | `/flavordb/more_properties/by-energy-range?min=-20&max=200&page=0&size=20` | Properties By Energy Range |
| GET | `/flavordb/more_properties/by-aromaticRings-range?min=0&max=10&page=0&size=20` | Properties By Aromatic Rings Range |
| GET | `/flavordb/more_properties/by-aromaticBonds-range?min=0&max=60&page=0&size=20` | Properties By Aromatic Bonds Range |
| GET | `/flavordb/more_properties/by-alogp-range?min=-10&max=10&page=0&size=20` | Properties By Alogp Range |
| GET | `/flavordb/more_properties/by-pubchemId-range?min=1&max=100000000&page=0&size=20` | Properties By PubChem ID Range |
| GET | `/flavordb/more_properties/by-pubchem_id?pubchem_id=1183&page=0&size=20` | Properties By PubChem ID |
| GET | `/flavordb/more_properties/by-aromaticRings?aromatic_rings=1&page=0&size=20` | Properties By Aromatic Rings |
| GET | `/flavordb/more_properties/by-aromaticBonds?aromatic_bonds=6&page=0&size=20` | Properties By Aromatic Bonds |
| GET | `/flavordb/more_properties/by-numRings?num_rings=1&page=0&size=20` | Properties By Num Rings |
| GET | `/flavordb/more_properties/by-rotatableBonds?rotatable_bonds=2&page=0&size=20` | Properties By Rotatable Bonds |
| GET | `/flavordb/more_properties/by-surfaceArea?surface_area=163.85&page=0&size=20` | Properties By Surface Area |
| GET | `/flavordb/more_properties/by-alogp?alogp=1.33&page=0&size=20` | Properties By Alogp |
| GET | `/flavordb/more_properties/by-numberOfAtoms?number_of_atoms=11&page=0&size=20` | Properties By Number Of Atoms |
| GET | `/flavordb/more_properties/by-energy?energy=15.12&page=0&size=20` | Properties By Energy |

### Molecule Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/molecules_data/filter-by-weight-range?min=4&max=1000&page=0&size=20` | Molecules By Weight Range |
| GET | `/flavordb/molecules_data/filter-by-type?type=natural&page=0&size=20` | Molecules By Type |
| GET | `/flavordb/molecules_data/filter-by-hbd-count-range?min=0&max=20&page=0&size=20` | Molecules By Hbd Count Range |
| GET | `/flavordb/molecules_data/filter-by-hba-count-range?min=0&max=20&page=0&size=20` | Molecules By Hba Count Range |
| GET | `/flavordb/molecules_data/by-topologicalPolarSurfaceArea-range?min=0&max=500&page=0&size=20` | Molecules By Topological Polar Surface Area Range |
| GET | `/flavordb/molecules_data/by-pubchemId-range?min=4&max=100000000&page=0&size=20` | Molecules By Pubchem ID Range |
| GET | `/flavordb/molecules_data/by-monoisotopicMass-range?min=4&max=1000&page=0&size=20` | Molecules By Monoisotopic Mass Range |
| GET | `/flavordb/molecules_data/by-heavyAtomCount-range?min=1&max=100&page=0&size=20` | Molecules By Heavy Atom Count Range |
| GET | `/flavordb/molecules_data/by-functionalGroups?functional_groups=alkene&page=0&size=20` | Molecules By Functional Groups |
| GET | `/flavordb/molecules_data/by-flavorProfile?flavor_profile=sweet-like&page=0&size=20` | Molecules By Flavor Profile |
| GET | `/flavordb/molecules_data/by-femaFlavorProfile?fema_flavor_profile=Fruit&page=0&size=20` | Molecules By Fema Flavor Profile |
| GET | `/flavordb/molecules_data/by-commonName?common_name=hesperidin&page=0&size=20` | Molecules By Common Name |
| GET | `/flavordb/molecules_data/by-id/6549/entities` | Entities By Molecule Id |
| GET | `/flavordb/molecules_data/by-pubchemId?pubchem_id=1183&page=0&size=20` | Molecule By Pubchem ID |
| GET | `/flavordb/molecules_data/by-monoisotopicMass?monoisotopic_mass=152.047&page=0&size=20` | Molecules By Monoisotopic Mass |
| GET | `/flavordb/molecules_data/by-topologicalPolarSurfaceArea?topological_polar_surface_area=46.5&page=0&size=20` | Molecules By Topological Polar Surface Area |
| GET | `/flavordb/molecules_data/by-heavyAtomCount?heavy_atom_count=11&page=0&size=20` | Molecules By Heavy Atom Count |
| GET | `/flavordb/molecules_data/filter-by-weight-from?from=500&page=0&size=20` | Molecules By Weight From |
| GET | `/flavordb/molecules_data/filter-by-hbd-count?hbdCount=1&page=0&size=20` | Molecules By Hbd Count |
| GET | `/flavordb/molecules_data/filter-by-hba-count?hbaCount=3&page=0&size=20` | Molecules By Hba Count |

### Entity Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/entities/by-natural-source?natural_source_name=cattle&page=0&size=20` | Entities By Natural Source |
| GET | `/flavordb/entities/by-name-and-category?entity_alias=grass&category=essentialoil&page=0&size=20` | Entities By Name And Category |
| GET | `/flavordb/entities/by-entity-alias-readable?entity_alias_readable=grass&page=0&size=20` | Entities By Readable Name |
| GET | `/flavordb/entities/by-id/42/molecules` | Molecules By Entity Id (Sorted by Rarity) |
| GET | `/flavordb/entities/by-id/42/molecules-compact` | Compact Molecules By Entity Id (Sorted by Rarity) |

### Food Pairing Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/food/by-alias?food_pair=mango` | Flavor Pairings by Ingredient |

### Dataset Connection Controller

| Method | Endpoint | Description |
|---|---|---|
| GET | `/flavordb/connections/links?entity_alias_readable=salt&page=0&size=20` | FlavorDB RecipeDB Links |

## CocktailDB 🔞 (`/cocktaildb`) · 18+ verified teams only · pagination `page` (from 1) + `page_size`

### Cocktails

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/categories?category=apple&page=1&page_size=1` | getCocktailRecipeByCategory |
| GET | `/cocktaildb/cocktailRecipe-search/Name?recipeName=Whisky Contardo` | getCocktailRecipeByName |
| GET | `/cocktaildb/cocktailRecipe-search/CocktailId/100003` | getCocktailRecipeById |
| GET | `/cocktaildb/cocktailRecipe-search/imageID/allrecipes_3` | getCocktailRecipeByImageId |
| GET | `/cocktaildb/cocktailRecipe-search/cocktailDetails/100003` | getCocktailDetails |
| GET | `/cocktaildb/cocktailRecipe-search/cocktailByExactName?title=Whisky Contardo` | getCocktailByExactName |
| GET | `/cocktaildb/cocktailRecipe-search/relatedCocktails/100003?limit=5` | getRelatedCocktails |

### Search

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/suggestions?query=whi&limit=5` | getSuggestions |
| POST | `/cocktaildb/cocktailRecipe-search/advancedSearch` | advancedSearch |
| POST | `/cocktaildb/cocktailRecipe-search/nutritionSearch` | nutritionSearch |

### Ingredients

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/AllIngredients` | getAllIngredients |
| GET | `/cocktaildb/cocktailRecipe-search/ingredientSubstitutes?ingredient=vodka&page=1&page_size=2` | IngredientsSubstitutes |
| POST | `/cocktaildb/cocktailRecipe-search/ingredients?page=1&page_size=2` | getCocktailRecipeByIngredients |
| GET | `/cocktaildb/cocktailRecipe-search/ingredientsByCocktail?cocktailTitle=Lychee Martini&page=1&page_size=20` | getIngredientsByCocktail |
| GET | `/cocktaildb/cocktailRecipe-search/ingredientDetails/42` | getIngredientDetailsById |
| POST | `/cocktaildb/cocktailRecipe-search/myBar?page=1&page_size=20` | myBar |
| GET | `/cocktaildb/cocktailRecipe-search/ingredientSearch?ingredient=vodka&page=1&page_size=2` | IngredientSearch |
| GET | `/cocktaildb/cocktailRecipe-search/ingredientImage/wiki_img_1` | getIngredientImage |

### Nutrition

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/getNutritonsOfCocktail?Cocktail_Title=Madras Cocktail&page=1&page_size=2` | getNutritionalInformationOfCocktail |
| GET | `/cocktaildb/cocktailRecipe-search/nutritionByCocktailId/100003` | getNutritionByCocktailId |

### Filters

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/rating?threshold=4.5&page=1&page_size=2` | getcocktailRecipeByRating |
| GET | `/cocktaildb/cocktailRecipe-search/votes?threshold=50&page=1&page_size=2` | getCocktailRecipeByVotes |
| GET | `/cocktaildb/cocktailRecipe-search/prepTime?threshold=10&page=1&page_size=10` | getCocktailRecipeByPrepTime |
| GET | `/cocktaildb/cocktailRecipe-search/cookTime?max=10&page=1&page_size=10` | getCocktailRecipeByCookTime |
| GET | `/cocktaildb/cocktailRecipe-search/totalTime?max=10&page=1&page_size=10` | getCocktailRecipeByTotalTime |
| GET | `/cocktaildb/cocktailRecipe-search/Servings?min=3&max=4&page=1&page_size=2` | getCocktailRecipeByServing |
| POST | `/cocktaildb/cocktailRecipe-search/Cooking_Action` | getCocktailRecipeByCookingAction |

### Metadata

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/cocktailRecipe-search/metadata` | getMetadata |
| GET | `/cocktaildb/cocktailRecipe-search/categories/list` | getCategoriesList |
| GET | `/cocktaildb/cocktailRecipe-search/methods/list` | getMethodsList |
| GET | `/cocktaildb/cocktailRecipe-search/version` | getApiVersion |
| GET | `/cocktaildb/cocktailRecipe-search/image/meta/allrecipes_13` | getImageMetadata |

### General

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cocktaildb/health` | CocktailDB Service Health |
