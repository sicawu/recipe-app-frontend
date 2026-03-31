import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, ArrowLeft } from 'lucide-react';
import DressingForm from './DressingForm.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService.jsx';
  
const CATEGORIES = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Main Course', 
  'Side Dish', 'Snack', 'Drink', 'Dip', 'Sauce', 'Salad', 'Soup', 'Bake', 'Grill'
];
const DIFFICULTIES = ['Easy', 'Medium', 'Pro'];
const UNITS = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'piece', 'cup', 'handful', 'bunch'];

export default function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: 'Easy',
    prepTime: 0,
    cookTime: 0,
    servings: 4,
    imageUrl: '',
    tags: [],
    description: '',
    ingredients: [],
    instructions: [],
    tip: '',
    dressing: [],
  });
  const [newTag, setNewTag] = useState('');
  const [newIngredient, setNewIngredient] = useState({ name: '', category: '', amount: 0, unit: '' });
  const [newInstruction, setNewInstruction] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipe = await getRecipeById(id);
        setFormData({
          name: recipe.name || '',
          category: recipe.category || '',
          difficulty: recipe.difficulty || 'Easy',
          prepTime: recipe.prepTime || 0,
          cookTime: recipe.cookTime || 0,
          servings: recipe.servings || 4,
          imageUrl: recipe.imageUrl || '',
          tags: recipe.tags || [],
          description: recipe.description || '',
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          tip: recipe.tip || '',
          dressing: recipe.dressing || [],
        });
      } catch (error) {
        console.error('Failed to load recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateRecipe(id, formData);
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error('Failed to update recipe:', error);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.amount) {
      setFormData({ ...formData, ingredients: [...formData.ingredients, newIngredient] });
      setNewIngredient({ name: '', category: '', amount: 0, unit: '' });
    }
  };

  const removeIngredient = (index) => {
    setFormData({ ...formData, ingredients: formData.ingredients.filter((_, i) => i !== index) });
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData({ ...formData, instructions: [...formData.instructions, newInstruction.trim()] });
      setNewInstruction('');
    }
  };

  const removeInstruction = (index) => {
    setFormData({ ...formData, instructions: formData.instructions.filter((_, i) => i !== index) });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-2xl mx-auto sage-glass rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to={`/recipes/${id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-500 to-pinky-500 text-white hover:shadow-glow-sage px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="flex-1 text-4xl font-bold leading-tight bg-gradient-to-r from-sage-600 via-pinky-500 to-sage-600 bg-clip-text text-transparent">
            Edit Recipe
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Recipe name</label>
              <input
                placeholder="e.g. Spaghetti Carbonara"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm">
                <option value="">Choose category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Prep time (minutes)</label>
              <input
                type="number"
                placeholder="15"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: Number(e.target.value) })}
                className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Cook time (minutes)</label>
              <input
                type="number"
                placeholder="20"
                value={formData.cookTime}
                onChange={(e) => setFormData({ ...formData, cookTime: Number(e.target.value) })}
                className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Servings (people)</label>
              <input
                type="number"
                placeholder="4"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
                className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Difficulty</label>
              <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-sage-700 mb-2">Image URL (optional)</label>
            <input
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-sage-700 mb-2">Description</label>
            <textarea
              placeholder="Brief description of the recipe..."
              className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Tip */}
          <div>
            <label className="block text-sm font-semibold text-sage-700 mb-2">Chef Tip (optional)</label>
            <textarea
              placeholder="Pro tip like 'let bread cool before cutting'"
              className="w-full p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              rows={2}
              value={formData.tip}
              onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-sage-700 mb-4">Tags</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Low-carb', 'Quick', 'Healthy', 'Spicy', 'Sweet', 'Savory', 'Family-friendly', 'Budget'].map((tag) => (
                <label key={tag} className="flex items-center gap-2 p-3 sage-glass rounded-xl cursor-pointer hover:shadow-md transition-all">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, tags: [...formData.tags, tag] });
                      } else {
                        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
                      }
                    }}
                    className="w-4 h-4 text-pinky-500 rounded focus:ring-pinky-400"
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
            {/* Existing tags list */}
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-sage-50 rounded">
                  <span className="font-medium text-sm">{tag}</span>
                  <button 
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-700 ml-auto p-1 hover:bg-red-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-4">Ingredients</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Name (e.g. flour)"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="flex-1 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              />
              <select 
                value={newIngredient.category || ''} 
                onChange={(e) => setNewIngredient({ ...newIngredient, category: e.target.value })}
                className="w-28 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              >
                <option value="">Category</option>
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Pantry">Pantry</option>
                <option value="Meat">Meat</option>
                <option value="Bakery">Bakery</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={newIngredient.amount}
                onChange={(e) => setNewIngredient({ ...newIngredient, amount: Number(e.target.value) })}
                className="w-24 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
              />
              <select value={newIngredient.unit} onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })} className="w-28 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm">
                <option value="">Unit</option>
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <button type="button" onClick={addIngredient} className="p-3 bg-fir-500 text-white rounded-xl hover:bg-fir-600 shadow-md">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {formData.ingredients.map((ing, index) => (
                <div key={index} className="flex items-center gap-3 p-3 sage-glass rounded-xl shadow-sm">
                  <span className="font-bold text-sm text-sage-600 min-w-[60px]">{ing.amount} {ing.unit}</span>
                  <span className="font-medium flex-1 text-sm">{ing.name}</span>
                  <button onClick={() => removeIngredient(index)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dressing */}
          <DressingForm 
            dressing={formData.dressing} 
            onDressingChange={(newDressing) => setFormData({ ...formData, dressing: newDressing })} 
          />

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-4">Instructions</label>
            <div className="flex gap-2 mb-4">
              <textarea
                placeholder="Step 1: Pre-heat oven..."
                className="flex-1 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
                rows={2}
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
              />
              <button type="button" onClick={addInstruction} className="p-3 bg-fir-500 text-white rounded-xl hover:bg-fir-600 shadow-md">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {formData.instructions.map((inst, index) => (
                <div key={index} className="flex items-start gap-3 p-3 sage-glass rounded-xl shadow-sm">
                  <span className="font-bold text-sage-600 w-8 min-w-[32px] flex-shrink-0">{index + 1}.</span>
                  <span className="flex-1 text-sm leading-relaxed">{inst}</span>
                  <button onClick={() => removeInstruction(index)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => navigate(`/recipes/${id}`)} className="flex-1 p-4 border sage-glass rounded-xl hover:shadow-md transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 p-4 bg-gradient-to-r from-fir-500 to-pinky-500 text-white rounded-xl hover:from-fir-600 hover:to-pinky-600 shadow-lg hover:shadow-glow-fir transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Update Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

