import React, { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService.jsx";
import RecipeList from "../components/RecipeList.jsx";
import ShoppingList from "../components/ShoppingList.jsx";
import AddRecipeForm from "../components/AddRecipeForm.jsx";
import { Plus } from "lucide-react";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [guests, setGuests] = useState(2);
  const [showAddModal, setShowAddModal] = useState(false);

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

  const generateList = () => {
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
    });

    const shoppingList = Array.from(ingredientMap.values());
    setShoppingList(shoppingList);
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
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Recipe Planner
          </h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Recipe
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full max-w-6xl">
              <AddRecipeForm 
                onClose={() => setShowAddModal(false)}
                onSuccess={() => {
                  setShowAddModal(false);
                  getRecipes().then(setRecipes);
                }} 
              />
            </div>
          </div>
        )}

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
            onGuestCountChange={setGuests}
          />
        )}

        {/* Guests */}
        <div className="flex items-center gap-4">
          <label className="font-medium">Guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="border rounded px-3 py-1 w-20"
          />
        </div>

        {/* Button */}
        <button
          onClick={generateList}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Generate Shopping List
        </button>

        {/* Shopping List */}
        <ShoppingList shoppingList={shoppingList} />

      </div>
    </div>
  );
}