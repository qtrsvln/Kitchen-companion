import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Lightbulb,
} from 'lucide-react';

interface CookingModeViewProps {
  recipe: Recipe;
  onFinishCooking: () => void;
  onExitCooking: () => void;
}

export const CookingModeView: React.FC<CookingModeViewProps> = ({
  recipe,
  onFinishCooking,
  onExitCooking,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const totalSteps = recipe.steps.length;
  const currentStep = recipe.steps[currentStepIndex];

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Stop any active speech on unmount or step change
  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    stopAudio();
    return () => {
      stopAudio();
    };
  }, [currentStepIndex]);

  // Audio Handlers
  const handleListen = () => {
    if (!speechSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    window.speechSynthesis.cancel();

    const textToRead = `Step ${currentStep.stepNumber} of ${totalSteps}. ${currentStep.title}. ${currentStep.instruction}${
      currentStep.tip ? ` Chef's tip: ${currentStep.tip}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onpause = () => {
      setIsPaused(true);
    };
    utterance.onresume = () => {
      setIsPaused(false);
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    stopAudio();
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onFinishCooking();
    }
  };

  const handlePrevious = () => {
    stopAudio();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col justify-between overflow-y-auto text-[#1A2D23]">
      {/* Top Floating App Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1B3B2B] text-white flex items-center justify-center font-bold text-xs">
            👨‍🍳
          </div>
          <div className="text-left">
            <span className="text-[11px] font-semibold text-[#667C6F] uppercase tracking-wider block leading-none">
              Cooking Mode
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#162E22] truncate max-w-[200px] sm:max-w-md mt-0.5">
              {recipe.name}
            </h2>
          </div>
        </div>

        <button
          onClick={onExitCooking}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DDD5C7] text-xs font-semibold text-[#486153] hover:text-[#162E22] hover:bg-[#F4EFE6] transition-colors cursor-pointer shadow-2xs"
        >
          <X className="w-4 h-4" />
          <span>Exit cooking</span>
        </button>
      </header>

      {/* Main Single-Step Card (Optimized for someone cooking in the kitchen) */}
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-auto py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E5DDD0] shadow-md space-y-8 text-left">
          {/* Step Counter & Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] border border-[#D5E3D8] text-xs sm:text-sm font-bold text-[#1F4B33]">
                Step {currentStep.stepNumber} of {totalSteps}
              </span>
              <span className="text-xs font-semibold text-[#768C7E]">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="w-full h-2 bg-[#EFE9DF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1B3B2B] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Current Step Title & Big Readable Instruction */}
          <div className="space-y-4 py-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#162E22] leading-tight">
              {currentStep.title}
            </h3>

            <p className="text-lg sm:text-2xl text-[#394E42] leading-relaxed font-normal">
              {currentStep.instruction}
            </p>
          </div>

          {/* Chef's Tip Callout */}
          {currentStep.tip && (
            <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#EAE1D2] flex items-start gap-3 text-[#4A5D51]">
              <div className="w-7 h-7 rounded-xl bg-[#F0E6D2] text-[#85632E] flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-[#7A643E]">
                  Chef's Tip
                </p>
                <p className="text-sm sm:text-base text-[#4E6155] mt-0.5 leading-normal">
                  {currentStep.tip}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* Prominent Audio "🔊 Listen" Section */}
          {/* Web Speech API Voice Controls */}
          {/* ========================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3ED]/80 border border-[#D5E3D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="voice-listen-prominent-btn"
                type="button"
                onClick={handleListen}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs ${
                  isSpeaking && !isPaused
                    ? 'bg-[#E0523C] hover:bg-[#C9432F] text-white animate-pulse'
                    : 'bg-[#1B3B2B] hover:bg-[#142C20] text-white hover:scale-[1.02]'
                }`}
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause Audio</span>
                  </>
                ) : isPaused ? (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Resume Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>🔊 Listen to step</span>
                  </>
                )}
              </button>

              {/* Stop audio button if currently playing or paused */}
              {(isSpeaking || isPaused) && (
                <button
                  type="button"
                  onClick={stopAudio}
                  title="Stop Audio"
                  className="p-3 rounded-xl bg-white border border-[#D4DFD7] text-[#556D5E] hover:text-[#C94736] hover:bg-[#FAF5F4] transition-colors cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              )}
            </div>

            {/* Status indicator */}
            <div className="text-xs text-[#526B5C] font-medium flex items-center gap-2">
              {isSpeaking && !isPaused ? (
                <>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#276B45] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#276B45]"></span>
                  </span>
                  <span>Reading instruction aloud...</span>
                </>
              ) : isPaused ? (
                <span>Audio paused</span>
              ) : (
                <span>Tap listen to hear instructions hands-free</span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Navigation Controls */}
      <footer className="w-full bg-white/95 backdrop-blur-md border-t border-[#EAE3D6] py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Previous Step Button */}
          <button
            id="cooking-previous-step-btn"
            type="button"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className={`px-5 sm:px-6 py-3.5 rounded-2xl border text-sm sm:text-base font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-[#EAE3D6] text-[#97A89F]'
                : 'border-[#D9D0C1] bg-[#FAF8F4] text-[#1B3B2B] hover:bg-[#F2EDE3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick step dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {recipe.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAudio();
                  setCurrentStepIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === currentStepIndex
                    ? 'w-6 bg-[#1B3B2B]'
                    : i < currentStepIndex
                    ? 'bg-[#769C85]'
                    : 'bg-[#E2DACD]'
                }`}
                title={`Jump to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Next / Finish Button */}
          <button
            id="cooking-next-step-btn"
            type="button"
            onClick={handleNext}
            className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] font-semibold text-sm sm:text-base flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            {currentStepIndex === totalSteps - 1 ? (
              <>
                <span>Finish recipe</span>
                <Sparkles className="w-4 h-4 text-[#8EE8B3]" />
              </>
            ) : (
              <>
                <span>Next step</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
