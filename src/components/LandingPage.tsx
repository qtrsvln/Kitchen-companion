import React, { useState } from 'react';
import { HeroIllustration, ClockIllustration } from './Illustrations';
import {
  Refrigerator,
  ScanLine,
  ShieldCheck,
  Leaf,
  ChevronDown,
  Sparkles,
  Share2,
  Mail,
  ArrowRight,
} from 'lucide-react';

interface LandingPageProps {
  onStartCooking: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartCooking }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="landing-top" className="w-full bg-[#FAF7F2] text-[#1A2D23]">
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge: Smarter cooking starts here */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EC] border border-[#D7E4DA] text-xs font-medium text-[#204331]">
                <span className="w-4 h-4 rounded-full bg-[#F6D0C9] text-[#E0523C] flex items-center justify-center text-[10px] font-bold">
                  ★
                </span>
                <span>Smarter cooking starts here</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#162E22] leading-[1.12]">
                Know what's for dinner before the fridge door closes.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#526459] leading-relaxed max-w-xl">
                The smart kitchen assistant that turns the ingredients you have into
                meals you'll love. Stop stressing over meal prep and start enjoying
                cooking again.
              </p>

              {/* CTAs */}
              <div id="hero-cta-buttons" className="pt-5 sm:pt-6 flex flex-wrap items-center gap-4">
                <button
                  id="hero-start-cooking-btn"
                  onClick={onStartCooking}
                  className="inline-flex items-center gap-2 bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <span>Start cooking</span>
                  <span className="text-lg">✨</span>
                </button>

                <button
                  id="hero-how-it-works-btn"
                  onClick={scrollToHowItWorks}
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#EFEAE1] text-[#1B3B2B] border border-[#DDD5C7] px-6 py-3.5 rounded-full text-base font-medium transition-colors cursor-pointer"
                >
                  See how it works
                </button>
              </div>
            </div>

            {/* Right Illustration Card */}
            <div className="lg:col-span-6 flex justify-center group">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 2. THE 5 PM PANIC ----------------- */}
      <section id="problem" className="py-20 md:py-24 bg-[#F5EFE6]/60 border-y border-[#EBE3D7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Left Clock Graphic */}
            <div className="md:col-span-5 flex justify-center group">
              <ClockIllustration />
            </div>

            {/* Right Description */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDEEEB] border border-[#F4D0C9] text-xs font-semibold text-[#D44733]">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E0523C] text-white flex items-center justify-center text-[9px] font-bold">
                  !
                </span>
                <span>The 5 PM Panic</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22]">
                End fridge fatigue.
              </h2>

              <p className="text-base sm:text-lg text-[#526459] leading-relaxed">
                We've all been there: staring into a fridge full of food, feeling like
                there's nothing to eat. You end up ordering takeout, and good
                groceries go to waste. Kitchen Companion takes the mental load off
                by showing you exactly what delicious meals hide in your pantry right
                now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 3. FEATURES ----------------- */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22] max-w-2xl mx-auto">
            Everything you need to cook smarter
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5B6F63] max-w-xl mx-auto">
            Turn everyday ingredients into extraordinary meals with tools designed to fit
            seamlessly into your life.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E3D8] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center mb-5">
                <Refrigerator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#162E22]">Cook with what you have</h3>
              <p className="mt-2 text-sm sm:text-base text-[#596C60] leading-relaxed">
                Stop making “one-ingredient” grocery trips. Use what's in your pantry.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E3D8] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center mb-5">
                <ScanLine className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#162E22]">Scan and save</h3>
              <p className="mt-2 text-sm sm:text-base text-[#596C60] leading-relaxed">
                Use your camera to scan barcodes and add products in seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E3D8] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#162E22]">Respects your restrictions</h3>
              <p className="mt-2 text-sm sm:text-base text-[#596C60] leading-relaxed">
                Suggestions that always fit your gluten-free, vegan, or personal
                needs.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E9E3D8] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center mb-5">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#162E22]">Reduce food waste</h3>
              <p className="mt-2 text-sm sm:text-base text-[#596C60] leading-relaxed">
                Better for your wallet and the planet. Use it before it goes bad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 4. HOW IT WORKS ----------------- */}
      <section id="how-it-works" className="py-20 md:py-24 bg-[#FAF7F2] border-t border-[#EAE2D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22]">
            How it works
          </h2>

          {/* 3 Step Icons */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xl font-bold shadow-xs">
                1
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#162E22]">
                Add what you have
              </h3>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xl font-bold shadow-xs">
                2
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#162E22]">
                Set the vibe
              </h3>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xl font-bold shadow-xs">
                3
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#162E22]">
                Pick a plan
              </h3>
            </div>
          </div>

          {/* Driver's seat callout */}
          <div className="mt-14 bg-[#EFEAE1]/90 rounded-2xl p-6 sm:p-7 border border-[#E3DC CE] flex items-start sm:items-center gap-4 text-left max-w-3xl mx-auto">
            <div className="w-9 h-9 rounded-xl bg-white text-[#1B3B2B] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#162E22]">You're in the driver's seat.</p>
              <p className="text-xs sm:text-sm text-[#55695D] mt-0.5">
                We only know what you tell us—no unnecessary tracking or accounts required to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 5. FAQ SECTION ----------------- */}
      <section id="faq" className="py-20 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif text-center font-normal tracking-tight text-[#162E22] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl border border-[#E8E2D7] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FDFBF7]"
              >
                <span className="font-semibold text-[#162E22] text-base sm:text-lg">
                  Is my data secure?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#65776C] transition-transform duration-200 ${
                    openFaq === 0 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 0 && (
                <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#55695D] leading-relaxed border-t border-[#F2ECE1]">
                  Yes. Kitchen Companion stores your pantry inventory and cooking preferences
                  locally in your browser session. We never sell your data or require sensitive
                  personal accounts to cook.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl border border-[#E8E2D7] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FDFBF7]"
              >
                <span className="font-semibold text-[#162E22] text-base sm:text-lg">
                  What about my dietary restrictions?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#65776C] transition-transform duration-200 ${
                    openFaq === 1 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#55695D] leading-relaxed border-t border-[#F2ECE1]">
                  You can specify your preferences—such as vegetarian, vegan, gluten-free, or quick
                  15-minute meals—at any time. Our recipe recommendations prioritize meals matching
                  your dietary selections with ingredients in your fridge and storage.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl border border-[#E8E2D7] overflow-hidden transition-all shadow-2xs">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FDFBF7]"
              >
                <span className="font-semibold text-[#162E22] text-base sm:text-lg">
                  How do I get started?
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#65776C] transition-transform duration-200 ${
                    openFaq === 2 ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#55695D] leading-relaxed border-t border-[#F2ECE1]">
                  Simply click "Start cooking ✨" above to enter Your Kitchen. Check off what you have
                  in your Fridge and Storage, choose what you're in the mood for, and pick a recipe to
                  start guided step-by-step voice cooking.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 6. FOOTER ----------------- */}
      <footer className="bg-[#14281E] text-[#D3E0D8] pt-16 pb-12 border-t border-[#1C372A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#213F30]">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#244A36] border border-[#315E46] flex items-center justify-center p-1 overflow-hidden">
                  <img
                    src="/logo.svg"
                    alt="Kitchen Companion - Tomato with Tablet Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Kitchen Companion
                </span>
              </div>
              <p className="text-sm text-[#9BB1A5] max-w-sm leading-relaxed">
                Making home cooking smarter, happier, and perfectly tailored to what
                you have.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-7 grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-semibold text-[#EAE2D5] tracking-wider uppercase mb-4">
                  Product
                </h4>
                <ul className="space-y-2.5 text-sm text-[#9BB1A5]">
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#EAE2D5] tracking-wider uppercase mb-4">
                  Company
                </h4>
                <ul className="space-y-2.5 text-sm text-[#9BB1A5]">
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      About Us
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Careers
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Contact Support
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#EAE2D5] tracking-wider uppercase mb-4">
                  Legal
                </h4>
                <ul className="space-y-2.5 text-sm text-[#9BB1A5]">
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Privacy Policy
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Terms of Service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9386] gap-4">
            <p>© 2026 Kitchen Companion. All rights reserved. Made with Spark.</p>
            <div className="flex items-center gap-4">
              <button
                title="Share"
                className="hover:text-white transition-colors cursor-pointer p-1"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href="mailto:hello@kitchencompanion.app"
                title="Email us"
                className="hover:text-white transition-colors p-1"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
