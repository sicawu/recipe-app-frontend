// import { mockRecipes } from '../data/mockRecipes';
const mockRecipes = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
    tags: ["Italian", "Pasta", "Classic"],
    description: "Authentic Roman spaghetti carbonara.",
    ingredients: [
      { name: "Spaghetti", amount: 400, unit: "g" },
      { name: "Eggs", amount: 4, unit: "" },
      { name: "Pecorino Romano", amount: 100, unit: "g" },
    ],
    instructions: [
      "Cook spaghetti al dente.",
      "Whisk eggs with pecorino.",
      "Fry guanciale until crispy.",
      "Toss everything off heat."
    ]
  },
  {
    id: "2",
    name: "Avocado Toast",
    category: "Breakfast",
    difficulty: "Easy",
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop",
    tags: ["Healthy", "Quick", "Vegetarian"],
    description: "Simple avocado toast perfection.",
    ingredients: [
      { name: "Avocados", amount: 2, unit: "" },
      { name: "Sourdough", amount: 2, unit: "slices" },
    ],
    instructions: [
      "Toast bread.",
      "Mash avocado.",
      "Spread and enjoy."
    ]
  }
];

// Key for localStorage
const RECIPES_KEY = 'recipe-app-recipes';

// Load recipes from localStorage, seed with mock if empty
export function loadRecipes() {
  try {
    const stored = localStorage.getItem(RECIPES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Seed with mock data
    localStorage.setItem(RECIPES_KEY, JSON.stringify(mockRecipes));
    return mockRecipes;
  } catch (error) {
    console.error('Failed to load recipes:', error);
    return mockRecipes;
  }
}

// Save recipes to localStorage
export function saveRecipes(recipes) {
  try {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Failed to save recipes:', error);
  }
}

// Add new recipe
export function addRecipe(recipe) {
  const recipes = loadRecipes();
  const newId = (recipes.length + 1).toString();
  const fullRecipe = { ...recipe, id: newId };
  recipes.push(fullRecipe);
  saveRecipes(recipes);
  return fullRecipe;
}

// Update recipe
export function updateRecipe(updated) {
  const recipes = loadRecipes();
  const index = recipes.findIndex(r => r.id === updated.id);
  if (index !== -1) {
    recipes[index] = updated;
    saveRecipes(recipes);
  }
}

// Delete recipe
export function deleteRecipe(id) {
  const recipes = loadRecipes();
  const filtered = recipes.filter(r => r.id !== id);
  saveRecipes(filtered);
}

// Get by ID
export function getRecipeById(id) {
  return loadRecipes().find(r => r.id === id);
}
