import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { getShoppingListById, getRecipes } from '../services/recipeService.jsx';
// import ShoppingList from '../components/ShoppingList.jsx';

export default function ShoppingListDetail() {
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set(JSON.parse(localStorage.getItem(`shoppinglist-checked-${id}`) || '[]')));

  useEffect(() => {
    loadList();
    getRecipes().then(setRecipes);
  }, [id]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const saved = localStorage.getItem(`shoppinglist-checked-${id}`);
    if (saved) {
      setCheckedIngredients(new Set(JSON.parse(saved)));
    }
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
      'Meat': 'bg-gradient-to-r from-pink-300 to-red-100 text-pink-600',
      'Meat & Fish': 'bg-gradient-to-r from-pink-200 to-red-100 text-pink-800',
      'Produce': 'bg-green-100 text-green-800',
      'Others': 'bg-gray-100 text-gray-800',
      'Drinks': 'bg-blue-200 text-blue-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!shoppingList) {
    return <div>Loading...</div>;
  }

  const groupedIngredients = shoppingList.ingredients.reduce((acc, ing) => {
    const cat = ing.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ing);
    return acc;
  }, {});

  const categoryOrder = ['Produce', 'Dairy', 'Meat', 'Pantry', 'Others', 'Drinks'];
  const getCategoryPriority = (cat) => {
    const index = categoryOrder.indexOf(cat);
    return index === -1 ? 99 : index;
  };
  const sortedGroups = Object.keys(groupedIngredients).sort((a, b) => getCategoryPriority(a) - getCategoryPriority(b));

  const toggleChecked = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
    localStorage.setItem(`shoppinglist-checked-${id}`, JSON.stringify(Array.from(newChecked)));
  };



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
              {sortedGroups.map((category) => {
                const items = groupedIngredients[category].sort((a, b) => a.name.localeCompare(b.name));
                return (
                  <div key={category} className={`${getIngredientCategoryColor(category).split(' ')[0]} rounded-2xl p-4 shadow-xl ring-1 ring-white/30`}>
                    <div className={`mb-3 p-2 rounded-xl font-bold text-lg ${getIngredientCategoryColor(category).split(' ')[1]} bg-white/30 backdrop-blur-sm`}>
                      {category} ({items.length})
                    </div>
                    <div className="space-y-2">
                      {items.map((ing, j) => {
                        const globalIndex = `${category}-${j}`; // unique key for checked state
                        const isChecked = checkedIngredients.has(globalIndex);
                        return (
                          <div key={j} className="flex items-center gap-3 p-2 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleChecked(globalIndex)}
                              className="w-5 h-5 rounded-lg bg-white border-2 border-white shadow-sm focus:ring-2 focus:ring-sage-400"
                            />
                            <div className={`flex-1 flex justify-between ${isChecked ? 'line-through decoration-2' : ''}`}>
                              <span className="font-medium text-base">{ing.name}</span>
                              <span className="font-bold text-base">{ing.total_amount.toFixed(1)} {ing.unit}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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

