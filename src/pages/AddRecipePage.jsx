import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AddRecipeForm from '../components/AddRecipeForm.jsx';

export default function AddRecipePage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen sagepink-gradient py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/recipes')}
          className="inline-flex items-center gap-2 mb-8 gamification-btn bg-gradient-to-r from-sage-500 to-pinky-500 text-white hover:shadow-glow-sage rounded-2xl px-6 py-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Recipes
        </button>
        
        <div className="sage-glass rounded-3xl shadow-2xl p-8">
          <AddRecipeForm 
            onClose={() => navigate('/recipes')}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}

