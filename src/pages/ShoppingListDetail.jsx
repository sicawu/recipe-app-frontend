import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { getShoppingListById, getRecipes } from '../services/recipeService.jsx';
import ShoppingList from '../components/ShoppingList.jsx';

export default function ShoppingListDetail() {
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadList();
    getRecipes().then(setRecipes);
  }, [id]);

  const loadList = async () => {
    try {
      const list = await getShoppingListById(id);
      setShoppingList(list);
    } catch (err) {
      console.error('Failed to load list:', err);
    }
  };

  const getIngredientCategoryColor = (category) => {
    const colors = {
      'Pantry': 'bg-amber-100 text-amber-800',
      'Dairy': 'bg-blue-100 text-blue-800',
      'Meat & Fish': 'bg-red-100 text-red-800',
      'Produce': 'bg-green-100 text-green-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!shoppingList) {
    return <div>Loading...</div>;
  }

  const categoryOrder = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Other'];
  const getCategoryPriority = (cat) => categoryOrder.indexOf(cat);
  const sortedIngredients = [...shoppingList.ingredients].sort((a, b) => {
    const catA = getCategoryPriority(a.category) === -1 ? 99 : getCategoryPriority(a.category);
    const catB = getCategoryPriority(b.category) === -1 ? 99 : getCategoryPriority(b.category);
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });


  return (
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link 
          to="/shopping-list" 
          className="inline-flex items-center gap-2 mb-8 gamification-btn bg-gradient-to-r from-sage-500 to-pinky-500 text-white hover:shadow-glow-sage px-8 py-4 rounded-2xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Lists
        </Link>

        <div className="sage-glass rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="handwritten text-5xl font-bold bg-gradient-to-r from-sage-600 to-pinky-500 bg-clip-text text-transparent mb-4">
              {shoppingList.name}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600 mb-8">
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{shoppingList.guests} guests</span>
              <span>{new Date(shoppingList.date).toLocaleDateString()}</span>
              <span>{shoppingList.recipeIds.length} recipes</span>
            </div>
          </div>

          {/* Simple categorized shopping list */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🛒 Shopping List
            </h2>
            <div className="space-y-4">
              {(() => {
                const grouped = sortedIngredients.reduce((acc, ing) => {
                  acc[ing.category] = acc[ing.category] || [];
                  acc[ing.category].push(ing);
                  return acc;
                }, {});
                return Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="sage-glass rounded-2xl p-6">
                    <div className={`inline-block px-4 py-2 rounded-xl font-semibold mb-4 ${getIngredientCategoryColor(category)}`}>
                      {category} ({items.length})
                    </div>
                    <div className="space-y-3">
                      {items.map((ing, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/50 rounded-xl backdrop-blur-sm border border-sage-200 hover:bg-white transition-colors">
                          <span className="font-medium">{ing.name}</span>
                          <span className="font-bold text-lg">{ing.total_amount.toFixed(1)} {ing.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Recipes Included */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              📖 Recipes Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.filter(r => shoppingList.recipeIds.includes(r.id)).map(recipe => (
                <Link 
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="sage-glass rounded-2xl p-6 hover:shadow-glow-sage hover:-translate-y-1 transition-all group"
                >
                  <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold text-lg mb-1">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">{recipe.category} • {recipe.difficulty}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

