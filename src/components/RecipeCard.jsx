import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { ClockIcon } from './ui/icons.jsx';

export default function RecipeCard({ recipe, isSelected = false, onToggle }) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div 
      className={`relative overflow-hidden rounded-3xl shadow-xl recipe-card-hover h-full group/card sage-glass ${
        isSelected 
          ? "ring-4 ring-pinky-200/50 shadow-glow-pinky bg-pinky-50/30 border-4 border-pinky-400/50" 
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
        className="absolute top-4 right-4 z-20 w-14 h-14 rounded-2xl sage-glass shadow-lg flex items-center justify-center hover:scale-110 transition-all border border-sage-300 hover:border-pinky-400 hover:shadow-glow-pinky group-hover:scale-110"
        style={isSelected ? { backgroundColor: '#E8A0B8', borderColor: '#D983A5' } : {}}
        aria-label={isSelected ? 'Deselect recipe' : 'Select recipe'}
      >
        {isSelected && <Check className="w-6 h-6 text-white" />}
      </button>

      {/* Image */}
      <div className="relative h-60 lg:h-72 overflow-hidden bg-gradient-to-br from-slate-200/50 to-slate-300/50">
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
            <span className="recipe-badge bg-gradient-to-r from-sage-500 to-pinky-500 text-white shadow-glow-sage">
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
          {/* No meta - super simple */}

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
