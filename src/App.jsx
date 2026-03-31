import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Plus, ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import RecipesPage from "./pages/RecipesPage.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import AddRecipePage from "./pages/AddRecipePage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import ShoppingListDetail from "./pages/ShoppingListDetail.jsx";
import EditRecipePage from "./pages/EditRecipePage.jsx";
import "./index.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="dark:bg-scandi-900 min-h-screen bg-gradient-to-br from-scandi-50 to-beige-50">
      <BrowserRouter>
        {/* Sidebar Mobile Toggle */}
        <button 
          className="fixed top-6 left-6 z-50 p-3 glass rounded-2xl shadow-glow-fir md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 glass backdrop-blur-xl transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 shadow-2xl`}>
          <div className="p-8">
            <button 
              className="absolute top-6 right-6 p-2 -m-2 rounded-2xl hover:bg-white/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shadow-glow-fir">
                <BookOpen className="w-7 h-7 text-fir-500" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-fir-600 to-rose-500 bg-clip-text text-transparent">
                  RecipeHub
                </h1>
                <p className="text-sm text-scandi-500">Your cooking adventure</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-2">
            
              <Link 
                to="/" 
                className="flex items-center gap-3 p-4 rounded-2xl glass hover:shadow-glow-fir transition-all group"
                onClick={() => setSidebarOpen(false)}
              >
                <BookOpen className="w-6 h-6 text-rose-500 group-hover:scale-110" />
                <span className="font-semibold">Recipes</span>
              </Link>
              <Link 
                to="/add-recipe" 
                className="flex items-center gap-3 p-4 rounded-2xl glass hover:shadow-glow-fir transition-all group"
                onClick={() => setSidebarOpen(false)}
              >
                <Plus className="w-6 h-6 text-emerald-500 group-hover:scale-110" />
                <span className="font-semibold">Add Recipe</span>
              </Link>
              <Link 
                to="/shopping-list" 
                className="flex items-center gap-3 p-4 rounded-2xl glass hover:shadow-glow-fir transition-all group"
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBag className="w-6 h-6 text-blue-500 group-hover:scale-110" />
                <span className="font-semibold">Shopping List</span>
              </Link>
              {/* Achievements link removed to simplify */}
            </nav>

            {/* Theme Toggle */}
            <div className="absolute bottom-8 left-8 right-8 p-4 glass rounded-2xl">
              <button 
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:shadow-glow-fir transition-all group"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="md:ml-0 lg:ml-72 pb-12">
          <Routes>
            <Route path="/" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
