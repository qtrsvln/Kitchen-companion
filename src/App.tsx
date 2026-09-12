import React, { useState, useEffect } from 'react';
import {
  AppView,
  KitchenProduct,
  CookedDish,
  Recipe,
  RecipePreferences,
  ProductCategory,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COOKED_DISHES,
  ALL_RECIPES,
} from './data/mockData';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { KitchenHub } from './components/KitchenHub';
import { CreateRecipeView } from './components/CreateRecipeView';
import { RecipeSuggestionsView } from './components/RecipeSuggestionsView';
import { RecipeDetailsView } from './components/RecipeDetailsView';
import { CookingModeView } from './components/CookingModeView';
import { RecipeFinishedModal } from './components/RecipeFinishedModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // Load persisted products or default to initial
  const [products, setProducts] = useState<KitchenProduct[]>(() => {
    try {
      const stored = localStorage.getItem('kitchen_companion_products');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load persisted cooked dishes or default to initial
  const [cookedDishes, setCookedDishes] = useState<CookedDish[]>(() => {
    try {
      const stored = localStorage.getItem('kitchen_companion_cooked_dishes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load cooked dishes from storage', e);
    }
    return INITIAL_COOKED_DISHES;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kitchen_companion_products', JSON.stringify(products));
    } catch (e) {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('kitchen_companion_cooked_dishes', JSON.stringify(cookedDishes));
    } catch (e) {
      // ignore
    }
  }, [cookedDishes]);

  // Current selected recipe for details & cooking
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(() => ALL_RECIPES[0]);

  // Preferences for recipe generation
  const [preferences, setPreferences] = useState<RecipePreferences>({
    time: '30 min',
    moods: ['Quick & easy', 'Comfort food'],
    diets: ['No preference'],
  });

  // Dynamic counts
  const fridgeCount = products.filter((p) => p.category === 'fridge').length;
  const storageCount = products.filter((p) => p.category === 'storage').length;
  const cookedCount = cookedDishes.length;

  // Handlers for Products
  const handleAddProduct = (name: string, category: ProductCategory, quantity?: string) => {
    const newProduct: KitchenProduct = {
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      category,
      addedAt: 'Just now',
      quantity: quantity || undefined,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateProductAmount = (productId: string, newAmount: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity: newAmount || undefined } : p))
    );
  };

  // Handlers for Cooked Dishes
  const handleAddCookedDish = (dishData: Omit<CookedDish, 'id'>) => {
    const newDish: CookedDish = {
      id: `cd-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...dishData,
    };
    setCookedDishes((prev) => [newDish, ...prev]);
  };

  const handleToggleLikeCookedDish = (dishId: string) => {
    setCookedDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, isLiked: !d.isLiked } : d))
    );
  };

  const handleRemoveCookedDish = (dishId: string) => {
    setCookedDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  // Recipe creation & cooking flow handlers
  const handleStartCreateRecipe = () => {
    setCurrentView('create-recipe');
  };

  const handleSubmitPreferences = (newPrefs: RecipePreferences) => {
    setPreferences(newPrefs);
    setCurrentView('recipe-suggestions');
  };

  const handleSelectRecipeFromSuggestions = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe-details');
  };

  const handleQuickMarkCookedFromSuggestions = (recipe: Recipe) => {
    handleAddCookedDish({
      name: recipe.name,
      cookedAt: 'Cooked today',
      servings: recipe.servings,
      image: recipe.image,
      description: recipe.description,
      recipeId: recipe.id,
      isLiked: false,
    });
    setCurrentView('kitchen');
  };

  const handleStartCooking = () => {
    if (!selectedRecipe) return;
    setCurrentView('recipe-finished');
  };

  const handleFinishCooking = () => {
    setCurrentView('recipe-finished');
  };

  const handleMarkRecipeAsCooked = (recipe: Recipe, isLiked?: boolean) => {
    handleAddCookedDish({
      name: recipe.name,
      cookedAt: 'Cooked today',
      servings: recipe.servings,
      image: recipe.image,
      description: recipe.description,
      recipeId: recipe.id,
      isLiked: !!isLiked,
    });
  };

  const handleAddToFridge = (isLiked?: boolean) => {
    if (!selectedRecipe) {
      setCurrentView('kitchen');
      return;
    }

    const newCookedDish: CookedDish = {
      id: `cd-${Date.now()}`,
      name: selectedRecipe.name,
      cookedAt: 'Cooked today',
      servings: selectedRecipe.servings,
      image: selectedRecipe.image,
      description: selectedRecipe.description,
      recipeId: selectedRecipe.id,
      isLiked: !!isLiked,
    };

    const newFridgeItem: KitchenProduct = {
      id: `p-${Date.now()}`,
      name: `${selectedRecipe.name} (Prepared)`,
      category: 'fridge',
      addedAt: 'Today',
      quantity: `${selectedRecipe.servings} servings`,
      icon: '🍲',
    };

    setCookedDishes((prev) => [newCookedDish, ...prev]);
    setProducts((prev) => [newFridgeItem, ...prev]);
    setCurrentView('kitchen');
  };

  const handleFinishDone = () => {
    setCurrentView('recipe-details');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A2D23] flex flex-col selection:bg-[#1B3B2B] selection:text-white">
      {/* Universal Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        fridgeCount={fridgeCount}
        storageCount={storageCount}
        cookedCount={cookedCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartCooking={() => setCurrentView('kitchen')}
          />
        )}

        {currentView === 'kitchen' && (
          <KitchenHub
            products={products}
            cookedDishes={cookedDishes}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onUpdateProductAmount={handleUpdateProductAmount}
            onAddCookedDish={handleAddCookedDish}
            onToggleLikeCookedDish={handleToggleLikeCookedDish}
            onRemoveCookedDish={handleRemoveCookedDish}
            onCreateRecipe={handleStartCreateRecipe}
          />
        )}

        {currentView === 'create-recipe' && (
          <CreateRecipeView
            products={products}
            onBackToKitchen={() => setCurrentView('kitchen')}
            onSubmitPreferences={handleSubmitPreferences}
          />
        )}

        {currentView === 'recipe-suggestions' && (
          <RecipeSuggestionsView
            products={products}
            cookedDishes={cookedDishes}
            preferences={preferences}
            onSelectRecipe={handleSelectRecipeFromSuggestions}
            onQuickMarkCooked={handleQuickMarkCookedFromSuggestions}
            onBackToPreferences={() => setCurrentView('create-recipe')}
          />
        )}

        {(currentView === 'recipe-details' || currentView === 'recipe-finished') && selectedRecipe && (
          <RecipeDetailsView
            recipe={selectedRecipe}
            products={products}
            onStartCooking={handleStartCooking}
            onMarkAsCooked={handleStartCooking}
            onBackToSuggestions={() => setCurrentView('recipe-suggestions')}
          />
        )}

        {currentView === 'recipe-finished' && selectedRecipe && (
          <RecipeFinishedModal
            recipe={selectedRecipe}
            onAddToFridge={handleAddToFridge}
            onDone={handleFinishDone}
          />
        )}
      </main>
    </div>
  );
}
