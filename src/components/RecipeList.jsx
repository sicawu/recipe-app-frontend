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

  const selectedRecipes = useMemo(() => 
    recipes.filter(recipe => selectedIds.includes(recipe.id)),
  [recipes, selectedIds]);

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
              className="pl-10 pr-4 py-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-44 p-3 border rounded-xl">
            <option value="All">All</option>
            {DIFFICULTIES.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map(category => (
            <div
              key={category}
              className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                selectedCategory === category 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 hover:bg-gray-300"
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
        <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs">👥</div>
          <div>
            <span className="font-semibold text-emerald-800">
              {selectedRecipes.length} recipes selected
            </span>
            <span className="text-sm text-emerald-700 ml-2">
              for {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
            </span>
          </div>
          {onGuestCountChange && (
            <input
              type="number"
              min="1"
              max="20"
              value={guestCount}
              onChange={(e) => onGuestCountChange(Number(e.target.value))}
              className="w-20 border rounded px-3 py-1 ml-auto focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
