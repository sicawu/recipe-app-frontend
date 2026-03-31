import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { addRecipe } from '../services/recipeService';
const CATEGORIES = ['Main Course', 'Breakfast', 'Dessert', 'Snack'];
const DIFFICULTIES = ['Easy', 'Medium', 'Pro'];

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
  });
  const [newTag, setNewTag] = useState('');
  const [newIngredient, setNewIngredient] = useState({ name: '', amount: 0, unit: '' });
  const [newInstruction, setNewInstruction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipe(formData);
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
      setNewIngredient({ name: '', amount: 0, unit: '' });
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
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add New Recipe</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Recipe Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Prep Time (min)"
            value={formData.prepTime}
            onChange={(e) => setFormData({ ...formData, prepTime: Number(e.target.value) })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Cook Time (min)"
            value={formData.cookTime}
            onChange={(e) => setFormData({ ...formData, cookTime: Number(e.target.value) })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Servings"
            value={formData.servings}
            onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Pro">Pro</option>
          </select>
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

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={addTag} className="p-3 bg-fir-500 text-white rounded-lg hover:bg-fir-600">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
                <button onClick={() => removeTag(index)} className="text-scandi-500 hover:text-fir-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium mb-2">Ingredients</label>
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Name"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newIngredient.amount}
              onChange={(e) => setNewIngredient({ ...newIngredient, amount: Number(e.target.value) })}
              className="w-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Unit (g, cups, etc)"
              value={newIngredient.unit}
              onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
              className="w-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={addIngredient} className="p-3 bg-fir-500 text-white rounded-lg hover:bg-fir-600">
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
