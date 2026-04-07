import { useState, useMemo, useCallback } from "react";
import RecipeCard from "./RecipeCard.jsx";
import { CATEGORIES, DIFFICULTIES } from "../lib/constants.jsx";

export default function RecipeList({
  recipes,
  selectedIds,
  setSelectedIds,
  guestCount = 2,
  onGuestCountChange
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = !searchTerm ||
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty]);

  const toggleSelection = useCallback((recipeId) => {
    setSelectedIds(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }, [setSelectedIds]);

  const selectedRecipes = useMemo(() => {
    return recipes.filter(recipe => selectedIds.includes(recipe.id)).map(recipe => ({
      ...recipe,
      scaleFactor: recipe.fixedAmount ? 1 : guestCount / recipe.servings
    }));
  }, [recipes, selectedIds, guestCount]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 sage-glass rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-sage-400 shadow-lg text-sage-800 placeholder-sage-500"
            />
          </div>
          
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map(category => (
            <div
              key={category}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all font-medium shadow-sm text-sm ${
                selectedCategory === category 
                  ? "bg-gradient-to-r from-sage-500 to-pinky-500 text-white shadow-glow-sage hover:scale-105" 
                  : "sage-glass hover:shadow-glow-pinky hover:-translate-y-0.5 border hover:border-sage-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {selectedRecipes.length > 0 && (
        <div className="flex items-center gap-4 p-6 sage-glass rounded-2xl shadow-lg border border-sage-200">
          <div className="w-6 h-6 bg-gradient-to-r from-sage-500 to-pinky-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-glow-sage">👥</div>
          <div>
            <span className="font-semibold text-emerald-800">
              {selectedRecipes.length} recipes selected
            </span>
            <span className="text-sm text-emerald-700 ml-2">
              for {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
            </span>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSelected={selectedIds.includes(recipe.id)}
            onToggle={() => toggleSelection(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}
