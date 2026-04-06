import { api } from './api.jsx';

// Get all recipes
export const getRecipes = () => api.get('/recipes').then(res => res.data);

// Get recipe by ID
export const getRecipeById = (id) => api.get(`/recipes/${id}`).then(res => res.data);

// Add new recipe
export const addRecipe = (recipe) => api.post('/recipes', recipe).then(res => res.data);

// Update recipe
export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe).then(res => res.data);

// Delete recipe
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`).then(res => res.data);

// Shopping Lists
export const createShoppingList = (listData) => api.post('/shopping-lists', listData).then(res => res.data);

export const getShoppingLists = () => api.get('/shopping-lists').then(res => res.data);

export const getShoppingListById = (id) => api.get(`/shopping-lists/${id}`).then(res => res.data);

export const deleteShoppingList = (id) => api.delete(`/shopping-lists/${id}`).then(res => res.data);

export const updateShoppingList = (id, data) => api.put(`/shopping-lists/${id}`, data).then(res => res.data);
