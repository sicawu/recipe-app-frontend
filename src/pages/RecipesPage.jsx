import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService.jsx";
import RecipeList from "../components/RecipeList.jsx";

import { Link } from "react-router-dom";
import { Plus, ShoppingBag } from "lucide-react";
import { createShoppingList } from "../services/recipeService.jsx";
import { ACHIEVEMENTS, BADGES } from "../lib/constants.jsx";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [guests, setGuests] = useState(2);
  const [listName, setListName] = useState('');

  const [xp, setXp] = useState(1250);
  const [streak, setStreak] = useState(5);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(recipes => {
        console.log('RecipesPage loaded recipes:', recipes);
        setRecipes(recipes);
      })
      .catch(err => {
        console.error('Failed to load recipes:', err);
      });
  }, []);

  const generateList = async () => {
    const selectedRecipes = recipes.filter(r => selectedIds.includes(r.id));
    const ingredientMap = new Map();

    selectedRecipes.forEach(recipe => {
      const scaleFactor = guests / recipe.servings;
      recipe.ingredients.forEach(ing => {
        const key = `${ing.name.toLowerCase()}-${ing.unit.toLowerCase()}`;
        const scaledAmount = ing.amount * scaleFactor;
        const current = ingredientMap.get(key) || { name: ing.name, total_amount: 0, unit: ing.unit, category: getIngredientCategory(ing.name) };
        ingredientMap.set(key, {
          ...current,
          total_amount: current.total_amount + scaledAmount
        });
      });
      if (recipe.dressing) {
        recipe.dressing.forEach(ing => {
          const key = `${ing.name.toLowerCase()}-${ing.unit.toLowerCase()}`;
          const scaledAmount = ing.amount * scaleFactor;
          const current = ingredientMap.get(key) || { name: ing.name, total_amount: 0, unit: ing.unit, category: getIngredientCategory(ing.name) };
          ingredientMap.set(key, {
            ...current,
            total_amount: current.total_amount + scaledAmount
          });
        });
      }
    });

    const listData = Array.from(ingredientMap.values());
    setShoppingList(listData);
    
    // Save to backend
    try {
      await createShoppingList({
        name: listName || `List for ${guests} ${guests === 1 ? 'person' : 'people'}`,
        recipeIds: selectedIds,
        ingredients: listData,
        guests
      });
      console.log('Shopping list saved');
    } catch (err) {
      console.error('Failed to save shopping list:', err);
    }
  };

  function getIngredientCategory(name) {
    const lower = name.toLowerCase();
    if (lower.includes('flour') || lower.includes('sugar') || lower.includes('butter')) return 'Pantry';
    if (lower.includes('milk') || lower.includes('egg') || lower.includes('cheese')) return 'Dairy';
    if (lower.includes('chicken') || lower.includes('beef') || lower.includes('fish')) return 'Meat & Fish';
    if (lower.includes('tomato') || lower.includes('lettuce') || lower.includes('carrot')) return 'Produce';
    return 'Other';
  }

  return (
    <div className="min-h-screen sagepink-gradient flex justify-center p-6 py-12">
      <div className="w-full max-w-6xl sage-glass rounded-3xl shadow-2xl p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-5xl md:text-6xl leading-tight bg-gradient-to-r from-sage-600 via-sage-500 to-pinky-500 bg-clip-text text-transparent tracking-tight">
            My Recipe Planner
          </h1>
          <Link to="/add-recipe" className="gamification-btn bg-gradient-to-r from-sage-500 to-sage-600 text-white hover:shadow-glow-sage hover:scale-105 px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-md text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add Recipe
          </Link>
        </div>



        {/* Recipes */}
        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No recipes found</p>
            <p className="text-sm text-gray-400">Backend at http://localhost:3001 – check console</p>
          </div>
        ) : (
          <RecipeList
            recipes={recipes}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            guestCount={guests}
          />
        )}

        {/* Guests & Name - moved under recipes */}
        <div className="space-y-4 p-6 sage-glass rounded-2xl shadow-lg border border-sage-200">
          <div className="flex items-center gap-4">
            <label className="font-medium text-lg">Guests:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="sage-glass rounded-xl px-4 py-2 w-24 text-sage-700 font-medium shadow-md focus:ring-2 focus:ring-pinky-400 text-lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="font-medium text-lg">List Name:</label>
            <input
              type="text"
              placeholder="e.g. Dinner Party"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="sage-glass rounded-xl px-4 py-3 flex-1 text-sage-700 font-medium shadow-md focus:ring-2 focus:ring-pinky-400 text-lg"
            />
          </div>
        </div>

        {/* Nav to Shopping List */}
{selectedIds.length > 0 ? (
          <button
            onClick={async () => {
              await generateList();
              window.location.href = '/shopping-list';
            }}
            disabled={!listName.trim()}
            className="w-full gamification-btn bg-gradient-to-r from-pinky-500 to-pinky-600 text-white hover:shadow-glow-pinky py-4 rounded-2xl text-lg font-bold px-8"
          >
            <ShoppingBag className="w-6 h-6 inline mr-2" />
            Generate & View List ({selectedIds.length} recipes)
          </button>
        ) : (
          <Link
            to="/shopping-list"
            className="w-full gamification-btn bg-gradient-to-r from-pinky-500 to-pinky-600 text-white hover:shadow-glow-pinky py-4 rounded-2xl text-lg font-bold px-8 block text-center"
          >
            <ShoppingBag className="w-6 h-6 inline mr-2" />
            View Saved Lists
          </Link>
        )}

      </div>
    </div>
  );
}