import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService.jsx';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ClockIcon, PrepIcon, CookIcon, DifficultyIcon } from '.././components/ui/icons.jsx';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestServings, setGuestServings] = useState(recipe ? recipe.servings : 1);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
        if (recipeData) {
          setGuestServings(recipeData.servings);
        }
      } catch (error) {
        console.error('Failed to load recipe:', error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
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
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-5xl mx-auto sage-glass rounded-3xl shadow-2xl overflow-hidden">
        {/* Header & Back */}
        <div className="p-10 border-b border-sage-200/50 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 gamification-btn bg-gradient-to-r from-sage-500 to-pinky-500 text-white hover:shadow-glow-sage mb-8 rounded-full px-6 py-2 text-sm shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>

          <Link
            to={`/edit-recipe/${recipe.id}`}
            className="absolute top-4 right-4 gamification-btn bg-gradient-to-r from-pinky-500 to-sage-500 text-white hover:shadow-glow-pinky w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"
          >
            <Pencil className="w-6 h-6" />
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="handwritten text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-sage-600 via-pinky-500 to-sage-600 bg-clip-text text-transparent mb-4">
                {recipe.name}
              </h1>
              {recipe.category && (
                <span className="px-4 py-2 bg-gradient-to-r from-fir-500 to-sage-500 text-white rounded-full text-sm font-medium mr-3 shadow-md">
                  {recipe.category}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="block text-3xl font-bold text-fir-600">{recipe.servings}</span>
              <span className="text-sm text-gray-600">servings</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="h-96 lg:h-[500px] overflow-hidden bg-gradient-to-br from-slate-200/50 to-slate-300/50">
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

        {/* Meta - single line with multiple icons */}
        <div className="p-6 pt-4 pb-3 border-b border-sage-200/50 bg-gradient-to-r from-white/70 to-sage-50/70 backdrop-blur-sm flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-sage-600">
            <DifficultyIcon className="w-4 h-4" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 text-fir-600 font-medium">
            <ClockIcon className="w-4 h-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-2 text-pinky-600">
            <PrepIcon className="w-4 h-4" />
            <span>{recipe.prepTime} prep</span>
          </div>
          <div className="flex items-center gap-2 text-pinky-600">
            <CookIcon className="w-4 h-4" />
            <span>{recipe.cookTime} cook</span>
          </div>
        </div>

        <div className="p-8 space-y-8">

          {/* Short description */}
          {recipe.description && (
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {recipe.description}
            </p>
          )}

          {/* Tags - pink design like overview selected category */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gradient-to-r from-pinky-600/30 to-pinky-500/30 backdrop-blur-sm text-white rounded-full text-sm font-semibold sage-glass border border-pinky-300/50">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="handwritten text-3xl font-bold mb-1 bg-gradient-to-r from-sage-600 via-pinky-500 to-sage-600 bg-clip-text text-transparent">Ingredients</h2>

          {/* Tiny servings adjuster */}
          <div className="flex items-center gap-3 px-3 sage-glass rounded-xl mb-2">
            <label className="font-medium text-sm text-gray-700">For</label>
            <input
              type="number"
              min="1"
              max="20"
              value={guestServings}
              onChange={(e) => setGuestServings(Number(e.target.value))}
              className="sage-glass rounded-lg px-3 w-16 text-sm font-bold text-sage-700 border border-sage-300 focus:ring-1 focus:ring-pinky-400 text-center"
            />
            <span className="text-sm text-gray-600">people</span>
          </div>

          <ul className="space-y-2">
            {recipe.ingredients.map((ing, index) => {
              const scaleFactor = recipe.fixedAmount ? 1 : guestServings / recipe.servings;
              const scaledAmount = Math.round(ing.amount * scaleFactor * 10) / 10;
              return (
                <li key={index} className="flex items-center gap-3 p-3 sage-glass rounded-xl">
                  <span className="font-bold text-base text-sage-600 flex-shrink-0">{scaledAmount}</span>
                  <span className="font-bold text-base bg-gradient-to-r from-sage-500 to-pinky-500 bg-clip-text text-transparent flex-shrink-0">{ing.unit}</span>
                  <span className="font-medium text-base flex-1">{ing.name}</span>
                </li>
              );
            })}
          </ul>

          {recipe.dressing && recipe.dressing.length > 0 && (
            <div className="mt-6 pt-6 border-t border-sage-200">
              <h3 className="handwritten text-2xl font-bold mb-4 bg-gradient-to-r from-pinky-500 to-sage-500 bg-clip-text text-transparent">🥗 Dressing, Sauces & Marinade</h3>
              <ul className="space-y-2">
                {recipe.dressing.map((ing, index) => {
                  const scaleFactor = recipe.fixedAmount ? 1 : guestServings / recipe.servings;
                  const scaledAmount = Math.round(ing.amount * scaleFactor * 10) / 10;
                  return (
                    <li key={index} className="flex items-center gap-3 p-3 sage-glass rounded-xl bg-gradient-to-r from-pinky-50 to-sage-50">
                      <span className="font-bold text-base text-sage-600 flex-shrink-0">{scaledAmount}</span>
                      <span className="font-bold text-base bg-gradient-to-r from-pinky-500 to-sage-500 bg-clip-text text-transparent flex-shrink-0">{ing.unit}</span>
                      <span className="font-medium text-base flex-1">{ing.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {recipe.instructions && recipe.instructions.length > 0 && (
            <div>
              <h2 className="handwritten text-3xl font-bold mb-6 bg-gradient-to-r from-sage-600 via-pinky-500 to-sage-600 bg-clip-text text-transparent">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-10 h-8 bg-gradient-to-r from-sage-500 to-pinky-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-glow-sage">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-gray-800 leading-relaxed pt-1">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simona's Tip */}
              {recipe.tip && (
                <div>
                  <h2 className="handwritten text-3xl font-bold mb-6 bg-gradient-to-r from-sage-600 via-pinky-500 to-sage-600 bg-clip-text text-transparent mt-8 pt-6">
                    Simona's Tip
                  </h2>
                  <div className="p-6 sage-glass rounded-2xl bg-gradient-to-r from-sage-50 to-white/50 border border-sage-200 shadow-lg">
                    <p className="text-lg text-gray-800 leading-relaxed italic">💡 {recipe.tip}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

