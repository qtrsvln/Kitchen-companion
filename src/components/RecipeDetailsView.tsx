import React, { useState } from 'react';
import { Recipe, KitchenProduct } from '../types';
import {
  Clock,
  Users,
  ArrowLeft,
  Bookmark,
  Check,
  Play,
  Sparkles,
  Heart,
  UtensilsCrossed,
} from 'lucide-react';
import { WatchDownloadingPlaceholder } from './WatchDownloadingPlaceholder';

interface RecipeDetailsViewProps {
  recipe: Recipe;
  products: KitchenProduct[];
  onStartCooking: () => void;
  onMarkAsCooked: (recipe: Recipe, isLiked?: boolean) => void;
  onBackToSuggestions: () => void;
}

export const RecipeDetailsView: React.FC<RecipeDetailsViewProps> = ({
  recipe,
  products,
  onStartCooking,
  onMarkAsCooked,
  onBackToSuggestions,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [cookedToast, setCookedToast] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Normalize user ingredients for checking
  const userIngredientNames = products.map((p) => p.name.toLowerCase().trim());

  const handleSaveRecipe = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  const handleMarkCooked = () => {
    onStartCooking();
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 sm:py-12 text-[#1A2D23]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        {/* Navigation */}
        <button
          onClick={onBackToSuggestions}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#486153] hover:text-[#162E22] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to suggestions</span>
        </button>

        {/* Hero Card with Large Food Image */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D7] shadow-sm">
          <div className="relative w-full h-72 sm:h-96 bg-[#18261F] overflow-hidden">
            {recipe.image && !imgFailed ? (
              <>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            ) : (
              <>
                <WatchDownloadingPlaceholder
                  size="large"
                  recipeName={recipe.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              </>
            )}
            {/* Top Right Floating Action Icons: Save & Like */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                title={isLiked ? 'Liked this recipe' : 'Like this recipe'}
                aria-label={isLiked ? 'Liked this recipe' : 'Like this recipe'}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-md ${
                  isLiked
                    ? 'bg-white text-[#D04834]'
                    : 'bg-black/40 hover:bg-black/60 text-white hover:text-[#FF8D7B]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleSaveRecipe}
                title={isSaved ? 'Recipe saved' : 'Save recipe'}
                aria-label={isSaved ? 'Recipe saved' : 'Save recipe'}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-md ${
                  isSaved
                    ? 'bg-white text-[#1B3B2B]'
                    : 'bg-black/40 hover:bg-black/60 text-white hover:text-[#90DCB1]'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-xs">
                {recipe.name}
              </h1>
            </div>
          </div>

          {/* Details & Action Bar */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#F0EBE1]">
              {/* Meta stats */}
              <div className="flex items-center gap-6 text-sm text-[#4E6356]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A9084] font-medium leading-none">Time</p>
                    <p className="font-bold text-sm text-[#162E22] mt-0.5">{recipe.prepTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7A9084] font-medium leading-none">Servings</p>
                    <p className="font-bold text-sm text-[#162E22] mt-0.5">{recipe.servings} people</p>
                  </div>
                </div>
              </div>

              {/* Actions: Like, Save, Mark as Cooked, Start Cooking */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {/* Like Button */}
                <button
                  id="recipe-like-btn"
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  title={isLiked ? 'Liked this recipe' : 'Like this recipe'}
                  aria-label={isLiked ? 'Liked this recipe' : 'Like this recipe'}
                  className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-[#FDECE9] border-[#F5C2BC] text-[#D04834]'
                      : 'bg-white border-[#D9D0C1] text-[#697D71] hover:text-[#D04834] hover:bg-[#FDF6F5]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Save Button */}
                <button
                  id="recipe-save-btn"
                  type="button"
                  onClick={handleSaveRecipe}
                  title={isSaved ? 'Recipe saved' : 'Save recipe'}
                  aria-label={isSaved ? 'Recipe saved' : 'Save recipe'}
                  className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-[#EBF2EC] border-[#B2D0BC] text-[#1E432E]'
                      : 'bg-white border-[#D9D0C1] text-[#3E5447] hover:bg-[#F8F5EE]'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                {/* Mark as cooked (Add finished dish directly) */}
                <button
                  id="recipe-mark-cooked-btn"
                  type="button"
                  onClick={handleMarkCooked}
                  className="px-4 py-3 rounded-2xl border-2 border-[#1B3B2B]/30 hover:border-[#1B3B2B] bg-[#F4F8F5] text-[#1B3B2B] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer hover:bg-[#EBF3ED]"
                  title="Already finished this dish? Add it directly to your cooked dishes"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Mark as cooked</span>
                </button>

                <button
                  id="recipe-start-cooking-primary-btn"
                  type="button"
                  onClick={onStartCooking}
                  className="px-5 sm:px-6 py-3 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start cooking</span>
                </button>
              </div>
            </div>

            {/* Recipe description */}
            <p className="text-base text-[#4E6356] leading-relaxed">
              {recipe.description}
            </p>

            {/* Ingredients & Instructions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
              {/* Ingredients List (Left Column) */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#162E22]">
                    Ingredients
                  </h3>
                  <span className="text-xs text-[#7A9084]">
                    {recipe.ingredients.length} items
                  </span>
                </div>

                <div className="bg-[#FAF8F4] rounded-2xl p-4 border border-[#E9E1D2] divide-y divide-[#EDE6DA]">
                  {recipe.ingredients.map((ing, idx) => {
                    const inKitchen = userIngredientNames.some(
                      (p) => ing.name.toLowerCase().includes(p) || p.includes(ing.name.toLowerCase())
                    );
                    return (
                      <div key={idx} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-sm text-[#162E22]">
                            {ing.name}
                          </p>
                          <p className="text-xs text-[#6F8276]">{ing.amount}</p>
                        </div>
                        {inKitchen ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#275E3D] bg-[#E5EFE8] px-2 py-0.5 rounded-md shrink-0">
                            <Check className="w-3 h-3" /> In kitchen
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#8C6D4C] bg-[#F7EFE1] px-2 py-0.5 rounded-md shrink-0">
                            + To add
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions Preview (Right Column) */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#162E22]">
                    Cooking Steps
                  </h3>
                  <span className="text-xs text-[#7A9084]">
                    Interactive voice in Cooking Mode
                  </span>
                </div>

                <div className="space-y-3">
                  {recipe.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#ECE5D8] flex gap-3.5 items-start"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {step.stepNumber}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-[#162E22]">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#556A5D] leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Toast */}
        {saveToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#162E22] text-[#FAF7F2] px-5 py-3 rounded-2xl shadow-xl border border-[#274B37] flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
            <Bookmark className="w-4 h-4 fill-current text-[#8EE8B3]" />
            <p className="text-sm font-medium">Recipe saved to your favorites!</p>
          </div>
        )}

        {/* Cooked Toast */}
        {cookedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1B3B2B] text-[#FAF7F2] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#306146] flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
            <div className="w-7 h-7 rounded-xl bg-[#285A3F] text-[#8EE8B3] flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Added to Cooked Dishes!</p>
              <p className="text-xs text-[#BED8C8]">
                {recipe.name} is now saved in Your Kitchen.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
