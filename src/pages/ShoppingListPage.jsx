import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getShoppingLists, deleteShoppingList } from '../services/recipeService.jsx';
import { ArrowLeft, Users, ShoppingBag } from 'lucide-react';
import ShoppingList from '../components/ShoppingList.jsx';

export default function ShoppingListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [shoppingLists, setShoppingLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const lists = await getShoppingLists();
      setShoppingLists(lists);
      if (lists.length > 0) {
        setSelectedList(lists[0]);
        setGuests(lists[0].guests || 2);
      }
    } catch (err) {
      console.error('Failed to load shopping lists:', err);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteShoppingList(id);
      loadLists();
    } catch (err) {
      console.error('Failed to delete list:', err);
    }
  };

  return (
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/recipes')}
            className="inline-flex items-center gap-2 gamification-btn bg-gradient-to-r from-pinky-500 to-sage-500 text-white hover:shadow-glow-pinky rounded-2xl px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-5 h-5 text-sage-500" />
            <span className="font-medium">{guests} guests</span>
          </div>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {shoppingLists.map(list => (
            <Link to={`/shopping-list/${list._id}`} className="sage-glass rounded-3xl shadow-2xl p-6 hover:shadow-glow-sage hover:-translate-y-2 transition-all group block">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pinky-500 to-sage-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{list.name}</h3>
                  <p className="text-sm text-gray-600">{list.recipeIds.length} recipes • {list.guests} guests • {new Date(list.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {list.ingredients.slice(0, 3).sort((a, b) => a.name.localeCompare(b.name)).map((ing, i) => (

                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-sage-500 rounded-full"></span>
                    <span>{ing.name} ({ing.total_amount.toFixed(1)} {ing.unit})</span>
                  </div>
                ))}
                {list.ingredients.length > 3 && <p className="text-sm text-gray-500">+{list.ingredients.length - 3} more...</p>}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                <span className="text-sm text-gray-500">Click for details</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    deleteList(list._id);
                  }}
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </div>
            </Link>
          ))}
          {shoppingLists.length === 0 && (
            <div className="text-center py-16 col-span-full">
              <p className="text-xl font-medium text-gray-600 mb-4">No shopping lists yet</p>
              <p className="text-gray-500 mb-8">Generate one from the Recipes page.</p>
              <button 
                onClick={() => navigate('/recipes')}
                className="gamification-btn bg-gradient-to-r from-sage-500 to-pinky-500 text-white px-8 py-3 rounded-2xl hover:shadow-glow-sage"
              >
                Go to Recipes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

