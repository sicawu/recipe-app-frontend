import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const UNITS = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'piece', 'cup', 'handful', 'bunch'];

export default function DressingForm({ dressing, onDressingChange, title = 'Dressing Ingredients' }) {
  const [newDressingIng, setNewDressingIng] = React.useState({ name: '', amount: 0, unit: '' });

  const addDressingIng = () => {
    if (newDressingIng.name && newDressingIng.amount) {
      onDressingChange([...dressing, newDressingIng]);
      setNewDressingIng({ name: '', amount: 0, unit: '' });
    }
  };

  const removeDressingIng = (index) => {
    const newDressing = dressing.filter((_, i) => i !== index);
    onDressingChange(newDressing);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-sage-700 mb-2">{title}</label>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="e.g. Olive oil"
          value={newDressingIng.name}
          onChange={(e) => setNewDressingIng({ ...newDressingIng, name: e.target.value })}
          className="flex-1 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newDressingIng.amount}
          onChange={(e) => setNewDressingIng({ ...newDressingIng, amount: Number(e.target.value) })}
          className="w-24 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
        />
        <select 
          value={newDressingIng.unit} 
          onChange={(e) => setNewDressingIng({ ...newDressingIng, unit: e.target.value })}
          className="w-28 p-3 sage-glass rounded-xl focus:ring-2 focus:ring-pinky-400 shadow-sm"
        >
          <option value="">Unit</option>
          {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <button type="button" onClick={addDressingIng} className="p-3 bg-fir-500 text-white rounded-xl hover:bg-fir-600 shadow-md">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {dressing.map((ing, index) => (
          <div key={index} className="flex items-center gap-3 p-3 sage-glass rounded-xl shadow-sm">
            <span className="font-bold text-sm text-sage-600 min-w-[60px]">{ing.amount} {ing.unit}</span>
            <span className="font-medium flex-1 text-sm">{ing.name}</span>
            <button onClick={() => removeDressingIng(index)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-100 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
