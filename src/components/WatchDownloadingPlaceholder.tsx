import React from 'react';
import { ChefHat, Utensils } from 'lucide-react';

interface WatchDownloadingPlaceholderProps {
  size?: 'compact' | 'medium' | 'large';
  className?: string;
  label?: string;
  recipeName?: string;
}

export const WatchDownloadingPlaceholder: React.FC<WatchDownloadingPlaceholderProps> = ({
  size = 'medium',
  className = '',
  recipeName,
}) => {
  if (size === 'compact') {
    return (
      <div
        className={`w-full h-full bg-[#18261F] flex flex-col items-center justify-center p-2 relative overflow-hidden rounded-xl select-none border border-[#2B4034] text-center ${className}`}
        title={recipeName || 'Recipe'}
      >
        <ChefHat className="w-5 h-5 text-[#8CB49E] shrink-0 mb-1" />
        {recipeName && (
          <span className="text-[10px] font-bold text-white/95 line-clamp-2 w-full leading-tight tracking-tight">
            {recipeName}
          </span>
        )}
      </div>
    );
  }

  const isLarge = size === 'large';

  return (
    <div
      className={`w-full h-full bg-gradient-to-b from-[#1F3327] via-[#17271E] to-[#101C15] flex flex-col items-center justify-center relative overflow-hidden select-none p-4 sm:p-6 text-center ${className}`}
    >
      {/* Ambient soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,168,136,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Culinary Icon Badge */}
      <div
        className={`${
          isLarge ? 'w-16 h-16 rounded-3xl mb-4' : 'w-12 h-12 rounded-2xl mb-3'
        } bg-white/5 border border-white/10 flex items-center justify-center shadow-inner z-10 backdrop-blur-xs shrink-0`}
      >
        {isLarge ? (
          <Utensils className="w-7 h-7 text-[#A7CDBC]" />
        ) : (
          <ChefHat className="w-6 h-6 text-[#A7CDBC]" />
        )}
      </div>

      {/* Repeated Recipe Name on Picture Area */}
      {recipeName && (
        <div className="text-center px-4 max-w-full z-10">
          <p
            className={`${
              isLarge
                ? 'text-xl sm:text-3xl max-w-xl line-clamp-2'
                : 'text-sm sm:text-base max-w-xs line-clamp-2'
            } font-bold text-white tracking-tight drop-shadow-md leading-snug`}
          >
            {recipeName}
          </p>
        </div>
      )}
    </div>
  );
};
