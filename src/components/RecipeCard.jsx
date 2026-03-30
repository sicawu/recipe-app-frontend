import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function RecipeCard({ recipe, isSelected = false, onToggle }) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div 
      className={`relative overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full group/card ${
        isSelected 
          ? "ring-4 ring-emerald-200 shadow-emerald-200/50 bg-emerald-50/50" 
          : ""
      }`}
      style={{border: isSelected ? '4px solid rgb(6 125 34)' : 'none'}}
    >
      {/* Selection Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggle();
        }}
        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-all border-2 border-gray-200 hover:border-gray-300"
        style={isSelected ? { backgroundColor: 'rgb(6 125 34)', borderColor: 'rgb(6 125 34)' } : {}}
        aria-label={isSelected ? 'Deselect recipe' : 'Select recipe'}
      >
        {isSelected && <Check className="w-6 h-6 text-white" />}
      </button>

      {/* Image */}
      <div className="relative h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-slate-200/50 to-slate-300/50">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <span className="text-4xl opacity-40">🍽️</span>
          </div>
        )}
        
        {/* Category Badge */}
        {recipe.category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
              {recipe.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Link */}
      <Link 
        to={`/recipes/${recipe.id}`}
        className="block p-6 hover:bg-gray-50 transition-colors group-hover/card:bg-gray-50"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="space-y-3">
          <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover/card:text-slate-900 transition-colors">
            {recipe.name}
          </h3>
          
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-600 pt-2">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0"></span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                {recipe.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></span>
              <span>{recipe.servings}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-gray-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
