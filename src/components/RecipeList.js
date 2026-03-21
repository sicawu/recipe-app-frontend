import React from "react";

export default function RecipeList({ recipes, selectedIds, setSelectedIds }) {
  const toggleRecipe = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <input
            type="checkbox"
            checked={selectedIds.includes(recipe.id)}
            onChange={() => toggleRecipe(recipe.id)}
          />
          {recipe.name}
        </div>
      ))}
    </div>
  );
}