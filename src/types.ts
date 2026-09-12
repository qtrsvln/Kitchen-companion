export type ProductCategory = 'fridge' | 'storage';

export interface KitchenProduct {
  id: string;
  name: string;
  category: ProductCategory;
  addedAt: string;
  quantity?: string;
  icon?: string;
}

export interface CookedDish {
  id: string;
  name: string;
  cookedAt: string;
  servings: number;
  image: string;
  recipeId?: string;
  description?: string;
  isLiked?: boolean;
}

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationMinutes?: number;
  tip?: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  timeCategory: '15 min' | '30 min' | '45+ min';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  moodTags: string[];
  dietTags: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
}

export interface RecipePreferences {
  time: '15 min' | '30 min' | '45+ min';
  moods: string[];
  diets: string[];
}

export type AppView =
  | 'landing'
  | 'kitchen'
  | 'create-recipe'
  | 'recipe-suggestions'
  | 'recipe-details'
  | 'cooking-mode'
  | 'recipe-finished';
