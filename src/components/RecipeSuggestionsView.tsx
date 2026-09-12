import React, { useEffect, useState } from 'react';
import { Recipe, RecipePreferences, KitchenProduct, CookedDish } from '../types';
import { ALL_RECIPES } from '../data/mockData';
import { Check, Plus, Clock, ChefHat, ArrowLeft, ArrowRight, Sparkles, Heart, Bookmark, UtensilsCrossed } from 'lucide-react';
import { WatchDownloadingPlaceholder } from './WatchDownloadingPlaceholder';

interface RecipeSuggestionsViewProps {
  products: KitchenProduct[];
  cookedDishes: CookedDish[];
  preferences: RecipePreferences;
  onSelectRecipe: (recipe: Recipe) => void;
  onQuickMarkCooked?: (recipe: Recipe) => void;
  onBackToPreferences: () => void;
}

export const RecipeSuggestionsView: React.FC<RecipeSuggestionsViewProps> = ({
  products,
  cookedDishes,
  preferences,
  onSelectRecipe,
  onQuickMarkCooked,
  onBackToPreferences,
}) => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<{
    recipe: Recipe;
    haveIngredients: string[];
    needIngredients: string[];
  }[]>([]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [likedRecipes, setLikedRecipes] = useState<Record<string, boolean>>({});
  const [savedRecipes, setSavedRecipes] = useState<Record<string, boolean>>({});

  const toggleLikeRecipe = (id: string) => {
    setLikedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Avoid dishes that already exist in Cooked dishes when possible
      const cookedDishNames = new Set(
        cookedDishes.map((d) => d.name.toLowerCase().trim())
      );

      // Normalized product names list from user's kitchen
      const userIngredientNames = products.map((p) => p.name.toLowerCase().trim());

      // Filter and score recipes
      const scored = ALL_RECIPES.map((recipe) => {
        const isAlreadyCooked = cookedDishNames.has(recipe.name.toLowerCase().trim());

        const have: string[] = [];
        const need: string[] = [];

        recipe.ingredients.forEach((ing) => {
          const ingLower = ing.name.toLowerCase();
          // Check if any product in user's kitchen matches this ingredient
          const matched = userIngredientNames.some(
            (p) => ingLower.includes(p) || p.includes(ingLower)
          );
          if (matched) {
            have.push(ing.name);
          } else {
            need.push(ing.name);
          }
        });

        // Match preferences
        let matchScore = have.length * 2;
        if (isAlreadyCooked) matchScore -= 10;
        if (recipe.timeCategory === preferences.time) matchScore += 3;
        if (recipe.moodTags.some((m) => preferences.moods.includes(m))) matchScore += 2;
        if (
          preferences.diets.length > 0 &&
          !preferences.diets.includes('No preference') &&
          recipe.dietTags.some((d) => preferences.diets.includes(d))
        ) {
          matchScore += 4;
        }

        return {
          recipe,
          haveIngredients: have,
          needIngredients: need,
          score: matchScore,
          isAlreadyCooked,
        };
      });

      // Sort by best score, prioritize not cooked
      scored.sort((a, b) => b.score - a.score);

      // Take top 3 mock recipe suggestions
      const top3 = scored.slice(0, 3).map((item) => ({
        recipe: item.recipe,
        haveIngredients: item.haveIngredients,
        needIngredients: item.needIngredients,
      }));

      setSuggestions(top3);
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [products, cookedDishes, preferences]);

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-[#E8F0EA] border border-[#D0E2D4] flex items-center justify-center text-3xl animate-bounce">
            🍲
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B3B2B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#1B3B2B]"></span>
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#162E22]">
          Finding something delicious...
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#5C7164] max-w-sm">
          Matching your fridge and storage with {preferences.time} recipes tailored to your mood.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 sm:py-12 text-[#1A2D23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
          <button
            onClick={onBackToPreferences}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#486153] hover:text-[#162E22] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Change preferences</span>
          </button>
        </div>

        {/* Section Heading */}
        <div className="text-left space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22]">
            Recommended for you
          </h1>
          <p className="text-sm sm:text-base text-[#5A6E62]">
            Selected based on what you have right now. Tap a recipe to inspect details or start cooking.
          </p>
        </div>

        {/* 3 Mock Recipe Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {suggestions.map(({ recipe, haveIngredients, needIngredients }) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D7] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left group"
            >
              {/* Recipe Image & Meta */}
              <div>
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#18261F]">
                  {recipe.image && !failedImages[recipe.id] ? (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [recipe.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <WatchDownloadingPlaceholder
                      size="medium"
                      recipeName={recipe.name}
                    />
                  )}

                  {/* Floating Action Icons: Like & Save (ONLY icons, no banners) */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLikeRecipe(recipe.id);
                      }}
                      title={likedRecipes[recipe.id] ? 'Liked this recipe' : 'Like this recipe'}
                      aria-label={likedRecipes[recipe.id] ? 'Liked this recipe' : 'Like this recipe'}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-md ${
                        likedRecipes[recipe.id]
                          ? 'bg-white text-[#D04834]'
                          : 'bg-black/40 hover:bg-black/60 text-white hover:text-[#FF8D7B]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedRecipes[recipe.id] ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveRecipe(recipe.id);
                      }}
                      title={savedRecipes[recipe.id] ? 'Recipe saved' : 'Save recipe'}
                      aria-label={savedRecipes[recipe.id] ? 'Recipe saved' : 'Save recipe'}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-md ${
                        savedRecipes[recipe.id]
                          ? 'bg-white text-[#1B3B2B]'
                          : 'bg-black/40 hover:bg-black/60 text-white hover:text-[#90DCB1]'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedRecipes[recipe.id] ? 'fill-current' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#667B6E] mb-1">
                      <span>{recipe.prepTime}</span>
                      <span>·</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#162E22] group-hover:text-[#214D35] transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#5D7366] line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>

                  {/* "You have" and "You need" clearly separated */}
                  <div className="space-y-3 pt-2 border-t border-[#F2ECE2]">
                    {/* You have */}
                    <div>
                      <p className="text-xs font-bold text-[#204933] uppercase tracking-wider mb-1.5">
                        You have:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {haveIngredients.length > 0 ? (
                          haveIngredients.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF4EE] text-[#1E432E] text-xs font-medium"
                            >
                              <Check className="w-3 h-3 text-[#2D6C48]" />
                              <span>{item}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#7B9084] italic">
                            Check recipe details
                          </span>
                        )}
                      </div>
                    </div>

                    {/* You need */}
                    <div>
                      <p className="text-xs font-bold text-[#7A6044] uppercase tracking-wider mb-1.5">
                        You need:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {needIngredients.length > 0 ? (
                          needIngredients.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF5EC] text-[#695036] text-xs font-medium border border-[#EFE5D5]"
                            >
                              <Plus className="w-3 h-3 text-[#946A42]" />
                              <span>{item}</span>
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF4EE] text-[#1E432E] text-xs font-medium">
                            <Check className="w-3 h-3" /> All ingredients in kitchen!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA: "Cook this →" & "Mark cooked" */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => onSelectRecipe(recipe)}
                  className="w-full py-3 px-4 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                >
                  <span>Cook this</span>
                  <span className="text-base group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>

                {onQuickMarkCooked && (
                  <button
                    type="button"
                    onClick={() => onQuickMarkCooked(recipe)}
                    className="w-full py-2 px-3 rounded-xl border border-[#DCD3C5] hover:border-[#1B3B2B] text-xs font-semibold text-[#486052] hover:text-[#162E22] hover:bg-[#FAF8F4] transition-colors cursor-pointer text-center"
                  >
                    Already made this? Add to cooked dishes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
