export interface Recipe {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Pro";
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
  tags: string[];
  description: string;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: string[];
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    category: "Main Course",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl: "https://res.cloudinary.com/djkv0io5j/image/upload/v1726749559/Ryoku-Cafe-Bangkok_bhayks.jpg",
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
  },
    {
    id: "3",
    name: "Simonas Carbonara",
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
];