import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService.jsx';
import { ArrowLeft } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundRecipe = getRecipeById(id);
      setRecipe(foundRecipe);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h1>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header & Back */}
        <div className="p-8 border-b border-gray-200">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.name}</h1>
              {recipe.category && (
                <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium mr-3">
                  {recipe.category}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="block text-3xl font-bold text-emerald-600">{recipe.servings}</span>
              <span className="text-sm text-gray-600">servings</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-96 lg:h-[500px] overflow-hidden bg-gradient-to-br from-slate-200/50 to-slate-300/50">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-6xl opacity-40">🍽️</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="p-8 pt-6 pb-4 border-b border-gray-200 flex items-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
              {recipe.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>{totalTime} min total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Prep: {recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span>Cook: {recipe.cookTime} min</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Description */}
          {recipe.description && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{recipe.description}</p>
            </div>
          )}

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipe.ingredients.map((ing, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors">
                  <span className="w-8 h-8 bg-white rounded-xl flex items-center justify-center font-bold text-emerald-600 text-sm">{index + 1}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{ing.name}</div>
                    <div className="text-2xl font-bold text-gray-800">{ing.amount} {ing.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg text-gray-800 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

