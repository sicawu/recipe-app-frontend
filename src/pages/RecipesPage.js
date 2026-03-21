import React, { useEffect, useState } from "react";
import { api } from "../api";
import RecipeList from "../components/RecipeList";
import ShoppingList from "../components/ShoppingList";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    api.get("/recipes").then((res) => setRecipes(res.data));
  }, []);

  const generateList = async () => {
    const res = await api.post("/shopping-list", {
      recipeIds: selectedIds,
      guestCount: guests,
    });

    setShoppingList(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center">
          Recipe Planner
        </h1>

        {/* Recipes */}
        <RecipeList
          recipes={recipes}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />

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