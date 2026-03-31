export const CATEGORIES = [
  "Breakfast",
  "Lunch", 
  "Dinner",
  "Dessert",
  "Appetizer",
  "Main Course",
  "Side Dish",
  "Snack",
  "Drink",
  "Dip",
  "Sauce"
];

export const DIFFICULTIES = ["Easy", "Medium", "Pro"];

export const ACHIEVEMENTS = [
  { 
    id: 'first-recipe', 
    name: 'First Recipe', 
    description: 'Create your first recipe', 
    required: 1, 
    type: 'recipes_created',
    unlocked: true,
    icon: 'book',
    xp: 50 
  },
  { 
    id: 'cooking-streak', 
    name: 'Cooking Streak x3', 
    description: 'Cook for 3 consecutive days', 
    required: 3, 
    type: 'streak_days',
    unlocked: false,
    icon: 'flame',
    xp: 100 
  },
  { 
    id: 'recipe-master', 
    name: 'Recipe Master', 
    description: 'Create 10 amazing recipes', 
    required: 10, 
    type: 'recipes_created',
    unlocked: false,
    icon: 'award',
    xp: 250 
  },
  { 
    id: 'pro-chef', 
    name: 'Pro Chef', 
    description: 'Master Pro difficulty recipes', 
    required: 5, 
    type: 'pro_recipes',
    unlocked: false,
    icon: 'star',
    xp: 500 
  },
  { 
    id: 'favorite-collector', 
    name: 'Favorite Collector', 
    description: 'Save 20 favorite recipes', 
    required: 20, 
    type: 'favorites',
    unlocked: false,
    icon: 'heart',
    xp: 300 
  },
];

export const BADGES = [
  { name: 'Beginner', icon: 'seedling', color: 'fir' },
  { name: 'Apprentice', icon: 'chef-hat', color: 'rose' },
  { name: 'Master', icon: 'award', color: 'gold' },
  { name: 'Legend', icon: 'crown', color: 'pink' },
];
