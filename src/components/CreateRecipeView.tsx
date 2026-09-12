import React, { useState } from 'react';
import { KitchenProduct, RecipePreferences } from '../types';
import { Clock, Heart, Sparkles, Check, ArrowLeft, Refrigerator, Archive } from 'lucide-react';

interface CreateRecipeViewProps {
  products: KitchenProduct[];
  onBackToKitchen: () => void;
  onSubmitPreferences: (preferences: RecipePreferences) => void;
}

export const CreateRecipeView: React.FC<CreateRecipeViewProps> = ({
  products,
  onBackToKitchen,
  onSubmitPreferences,
}) => {
  const [selectedTime, setSelectedTime] = useState<'15 min' | '30 min' | '45+ min'>('30 min');
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['Quick & easy', 'Comfort food']);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['No preference']);

  const fridgeCount = products.filter((p) => p.category === 'fridge').length;
  const storageCount = products.filter((p) => p.category === 'storage').length;

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter((m) => m !== mood));
      }
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const toggleDiet = (diet: string) => {
    if (diet === 'No preference') {
      setSelectedDiets(['No preference']);
      return;
    }

    const withoutNoPref = selectedDiets.filter((d) => d !== 'No preference');
    if (withoutNoPref.includes(diet)) {
      const next = withoutNoPref.filter((d) => d !== diet);
      setSelectedDiets(next.length === 0 ? ['No preference'] : next);
    } else {
      setSelectedDiets([...withoutNoPref, diet]);
    }
  };

  const handleCreate = () => {
    onSubmitPreferences({
      time: selectedTime,
      moods: selectedMoods,
      diets: selectedDiets,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 sm:py-12 text-[#1A2D23]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation button */}
        <button
          onClick={onBackToKitchen}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#486153] hover:text-[#162E22] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Your Kitchen</span>
        </button>

        {/* Header */}
        <div className="text-left space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F0EA] text-xs font-semibold text-[#1E4330]">
            Set the Vibe
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22]">
            What are you in the mood for?
          </h1>
          <p className="text-sm sm:text-base text-[#576D60]">
            We'll craft custom recipe recommendations using the ingredients available
            in your fridge and pantry.
          </p>
        </div>

        {/* Current Available Products Bar */}
        <div
          id="available-ingredients-card"
          className="bg-white rounded-2xl p-5 border border-[#E7E0D4] shadow-2xs text-left"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F2EDE3]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#63796D]">
              Available ingredients from your kitchen
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-[#1E3B2B]">
              <span className="flex items-center gap-1">
                <Refrigerator className="w-3.5 h-3.5" /> Fridge: {fridgeCount}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Archive className="w-3.5 h-3.5" /> Storage: {storageCount}
              </span>
            </div>
          </div>

          <div
            id="available-ingredients-tag-list"
            className="pt-3 flex flex-wrap gap-1.5 max-h-[112px] overflow-y-auto"
          >
            {products.map((p) => (
              <span
                key={p.id}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border leading-normal ${
                  p.category === 'fridge'
                    ? 'bg-[#F2F7F3] border-[#D4E4D8] text-[#1D402E]'
                    : 'bg-[#F9F7F3] border-[#E8E1D2] text-[#4A4032]'
                }`}
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] shadow-2xs space-y-8 text-left">
          {/* 1. TIME PREFERENCE */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#63796D] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1B3B2B]" />
              <span>TIME</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['15 min', '30 min', '45+ min'] as const).map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3.5 px-4 rounded-2xl border-2 text-sm sm:text-base font-semibold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white shadow-xs'
                        : 'border-[#E4DCCE] bg-[#FAF8F5] text-[#162E22] hover:border-[#1B3B2B]/40 hover:bg-[#F4EFE7]'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. MOOD PREFERENCE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#63796D] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#1B3B2B]" />
                <span>MOOD</span>
              </label>
              <span className="text-[11px] text-[#7A9084]">Select one or more</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Quick & easy', 'Comfort food', 'Healthy', 'Something new'].map((mood) => {
                const isSelected = selectedMoods.includes(mood);
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => toggleMood(mood)}
                    className={`py-3 px-3 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-[#1B3B2B] bg-[#EAF2ED] text-[#1B3B2B] font-semibold'
                        : 'border-[#E4DCCE] bg-[#FAF8F5] text-[#3D5245] hover:border-[#1B3B2B]/40 hover:bg-[#F4EFE7]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    <span>{mood}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. DIET PREFERENCE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#63796D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1B3B2B]" />
                <span>DIET</span>
              </label>
              <span className="text-[11px] text-[#7A9084]">Dietary filters</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['No preference', 'Vegetarian', 'Vegan', 'Gluten-free'].map((diet) => {
                const isSelected = selectedDiets.includes(diet);
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => toggleDiet(diet)}
                    className={`py-3 px-3 rounded-2xl border-2 text-sm font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'border-[#1B3B2B] bg-[#EAF2ED] text-[#1B3B2B] font-semibold'
                        : 'border-[#E4DCCE] bg-[#FAF8F5] text-[#3D5245] hover:border-[#1B3B2B]/40 hover:bg-[#F4EFE7]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    <span>{diet}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA: "Create my recipe ✨" */}
          <div className="pt-4">
            <button
              id="create-my-recipe-submit-btn"
              type="button"
              onClick={handleCreate}
              className="w-full py-4 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] font-semibold text-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>Create my recipe</span>
              <span className="text-xl">✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
