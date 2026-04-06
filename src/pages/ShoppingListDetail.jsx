import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Trash2, Plus, Save, X } from 'lucide-react';
import { getShoppingListById, getRecipes, deleteShoppingList, updateShoppingList } from '../services/recipeService.jsx';
import RecipeList from '../components/RecipeList.jsx';

export default function ShoppingListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoppingList, setShoppingList] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set(JSON.parse(localStorage.getItem(`shoppinglist-checked-${id}`) || '[]')));
  const [showRecipeManager, setShowRecipeManager] = useState(false);
  const [recipeSelectedIds, setRecipeSelectedIds] = useState([]);

  const currentRecipeIds = shoppingList?.recipeIds || [];

  useEffect(() => {
    if (shoppingList?.recipeIds) {
      setRecipeSelectedIds(shoppingList.recipeIds);
    }
  }, [shoppingList]);

  useEffect(() => {
    loadList();
    getRecipes().then(setRecipes);
  }, [id]);

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

  const toggleRecipeManager = () => setShowRecipeManager(!showRecipeManager);

  const handleRecipeSave = async () => {
    try {
      const updated = await updateShoppingList(id, { recipeIds: recipeSelectedIds });
      setShoppingList(updated);
      setShowRecipeManager(false);
      await loadList();
    } catch (err) {
      alert('Failed to save recipe changes');
      console.error(err);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this shopping list? This cannot be undone.')) {
      deleteShoppingList(id).then(() => navigate('/shopping-list'));
    }
  };

  return (
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/shopping-list"
          className="inline-flex items-center gap-2 gamification-btn bg-gradient-to-r from-sage-500 to-pinky-500 text-white hover:shadow-glow-sage mb-8 rounded-full px-6 py-2 text-sm shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
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
              <span>{currentRecipeIds.length} recipes</span>
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
                        const globalIndex = `${category}-${j}`;
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
            <h2 className="text-2xl font-bold mb-6 flex gap-2">
                📖 Recipes Included ({currentRecipeIds.length})
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {recipes.filter(r => currentRecipeIds.includes(r.id)).map(recipe => (
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

            <div className="flex justify-center mt-12">
              <button onClick={handleDelete} className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all shadow-xl hover:shadow-glow-red text-lg font-semibold">
                <Trash2 className="w-5 h-5" />
                Delete Shopping List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




