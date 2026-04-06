import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import DressingForm from './DressingForm.jsx';
import { addRecipe } from '../services/recipeService';
const CATEGORIES = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Main Course',
  'Side Dish', 'Snack', 'Drink', 'Dip', 'Sauce', 'Salad', 'Soup', 'Bake', 'Grill', 'Bread'
];
const DIFFICULTIES = ['Easy', 'Medium', 'Pro'];
const UNITS = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'piece(s)', 'cup(s)', 'can(s)', 'bag', 'handful', 'bunch', 'pinch', 'oz'];

export default function AddRecipeForm1({ onClose, onSuccess }) {
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
  const [dressing, setDressing] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', category: '', amount: 0, unit: '' });
  const [newInstruction, setNewInstruction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe({ ...formData, dressing });
    onSuccess();
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

  return (
    <div className="sage-glass rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-sage-600 via-sage-500 to-pinky-500 bg-clip-text text-transparent tracking-tight mb-6">
        Add New Recipe
      </h1>
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
          {/* Duplicate prep/cook inputs removed - now labeled above */}
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
        <input
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

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
          <label className="block text-sm font-semibold text-sage-700 mb-4">Tags (select)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Low-carb', 'Quick', 'Healthy', 'Spicy', 'Sweet', 'Savory', 'Family-friendly'].map((tag) => (
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
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium mb-2">Ingredients</label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Name"
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
              <option value="Drinks">Drinks</option>
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
          <div className="space-y-2">
            {formData.ingredients.map((ing, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="font-medium">{ing.name}</span>
                <span>{ing.amount} {ing.unit}</span>
                <button onClick={() => removeIngredient(index)} className="text-scandi-500 hover:text-fir-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dressing */}
        <DressingForm
          dressing={dressing}
          onDressingChange={(newDressing) => setDressing(newDressing)}
        />

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium mb-2">Instructions</label>
          <div className="flex gap-2 mb-4">
            <textarea
              placeholder="New instruction"
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.shiftKey && addInstruction()}
            />
            <button type="button" onClick={addInstruction} className="p-3 bg-fir-500 text-white rounded-lg hover:bg-fir-600">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {formData.instructions.map((inst, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-sage-50 rounded-lg">
                <span className="font-bold text-sage-600 w-6">{index + 1}.</span>
                <span>{inst}</span>
                <button onClick={() => removeInstruction(index)} className="text-red-500 hover:text-red-700 ml-auto">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onClose} className="flex-1 p-3 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="flex-1 p-3 bg-gradient-to-r from-fir-500 to-pinky-500 text-white rounded-lg hover:from-fir-600 hover:to-pinky-600">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
