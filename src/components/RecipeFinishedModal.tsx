import React, { useState } from 'react';
import { Recipe } from '../types';
import { Refrigerator, CheckCircle2, X, Heart } from 'lucide-react';
import { WatchDownloadingPlaceholder } from './WatchDownloadingPlaceholder';

interface RecipeFinishedModalProps {
  recipe: Recipe;
  onAddToFridge: (isLiked?: boolean) => void;
  onDone: () => void;
}

export const RecipeFinishedModal: React.FC<RecipeFinishedModalProps> = ({
  recipe,
  onAddToFridge,
  onDone,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-completed-title"
      className="fixed inset-0 z-50 bg-[#162E22]/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E0D7C9] shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-6">
        {/* Dismiss / Close Icon */}
        <button
          type="button"
          onClick={onDone}
          title="Close"
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#526B5D] hover:text-[#162E22] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dish image / placeholder */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#1B3B2B]/20 shadow-md bg-[#18261F]">
          {recipe.image && !imgFailed ? (
            <>
              <img
                src={recipe.image}
                alt={recipe.name}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1B3B2B]/10" />
            </>
          ) : (
            <WatchDownloadingPlaceholder
              size="compact"
              recipeName={recipe.name}
            />
          )}
        </div>

        {/* Recipe is completed heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF4EE] text-xs font-bold text-[#1E432E] border border-[#D1E6D8]">
            <CheckCircle2 className="w-4 h-4 text-[#2D6C48]" />
            <span>Recipe is completed</span>
          </div>
          <h2
            id="recipe-completed-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#162E22]"
          >
            Dinner is ready! 🎉
          </h2>
          <p className="text-base font-semibold text-[#2D5640]">
            {recipe.name}
          </p>
          <p className="text-xs sm:text-sm text-[#5C7365] leading-relaxed max-w-xs mx-auto">
            Ready to store leftovers or meal prep in your kitchen inventory?
          </p>
        </div>

        {/* Like favorite option */}
        <div className="p-3 rounded-2xl bg-[#FAF8F4] border border-[#EAE2D5] flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Heart
              className={`w-4 h-4 ${
                isLiked ? 'text-[#D04834] fill-current' : 'text-[#7B9284]'
              }`}
            />
            <span className="text-xs font-medium text-[#203D2E]">
              Save to favorites
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isLiked
                ? 'bg-[#FDECE9] text-[#D04834] border border-[#F6C6BF]'
                : 'bg-white border border-[#D9D0C1] text-[#4F6457] hover:bg-[#F2ECE1]'
            }`}
          >
            {isLiked ? '❤️ Favorited' : 'Add to favorites'}
          </button>
        </div>

        {/* Primary Action Button: "Add to the fridge" */}
        <div className="space-y-2.5 pt-1">
          <button
            id="finished-add-to-fridge-primary-btn"
            type="button"
            onClick={() => onAddToFridge(isLiked)}
            className="w-full py-4 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] font-semibold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <Refrigerator className="w-5 h-5" />
            <span>Add to the fridge</span>
          </button>

          <button
            id="finished-done-secondary-btn"
            type="button"
            onClick={onDone}
            className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#576F61] hover:text-[#162E22] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

