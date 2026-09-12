import React from 'react';
import { AppView } from '../types';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  fridgeCount: number;
  storageCount: number;
  cookedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  fridgeCount,
  storageCount,
  cookedCount,
}) => {
  const isLanding = currentView === 'landing';

  const handleReturnToTopLanding = () => {
    onNavigate('landing');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => {
      const landingEl = document.getElementById('landing-top');
      if (landingEl) {
        landingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={handleReturnToTopLanding}
          className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none cursor-pointer"
        >
          {/* Tomato with Tablet Companion Logo */}
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/logo.svg"
              alt="Kitchen Companion - Tomato with Tablet Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-[#162E22] group-hover:text-[#28543E] transition-colors">
              Kitchen Companion
            </span>
          </div>
        </button>

        {/* Navigation items based on whether user is on Landing or In-App */}
        {isLanding ? (
          <div className="flex items-center gap-6 sm:gap-8">
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#465A4F]">
              <a
                id="nav-problem-solution"
                href="#problem"
                className="hover:text-[#162E22] transition-colors"
              >
                Problem Solution
              </a>
              <a
                id="nav-features"
                href="#features"
                className="hover:text-[#162E22] transition-colors"
              >
                Features
              </a>
              <a
                id="nav-how-it-works"
                href="#how-it-works"
                className="hover:text-[#162E22] transition-colors"
              >
                How It Works
              </a>
              <a
                id="nav-faq"
                href="#faq"
                className="hover:text-[#162E22] transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* "Find a recipe ->" primary button matching 2.png */}
            <button
              id="header-find-recipe-btn"
              onClick={() => onNavigate('kitchen')}
              className="inline-flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#152E22] text-[#F3EFE6] px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Find a recipe</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* In-app navigation tabs */}
            <nav className="flex items-center bg-[#EAE3D6]/70 p-1 rounded-full text-xs sm:text-sm font-medium">
              <button
                id="nav-tab-home"
                onClick={handleReturnToTopLanding}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentView === 'landing'
                    ? 'bg-white text-[#1B3B2B] shadow-xs font-semibold'
                    : 'text-[#485E52] hover:text-[#1B3B2B]'
                }`}
              >
                Home
              </button>
              <button
                id="nav-tab-kitchen"
                onClick={() => onNavigate('kitchen')}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentView === 'kitchen'
                    ? 'bg-white text-[#1B3B2B] shadow-xs font-semibold'
                    : 'text-[#485E52] hover:text-[#1B3B2B]'
                }`}
              >
                Kitchen
              </button>
              <button
                id="nav-tab-create-recipe"
                onClick={() => onNavigate('create-recipe')}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentView === 'create-recipe'
                    ? 'bg-white text-[#1B3B2B] shadow-xs font-semibold'
                    : 'text-[#485E52] hover:text-[#1B3B2B]'
                }`}
              >
                Create Recipe
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
