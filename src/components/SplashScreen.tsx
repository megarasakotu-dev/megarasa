'use client';

import { useState, useEffect } from 'react';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Only show splash screen once per session to maintain quick subsequent navigations
    const hasSeenSplash = sessionStorage.getItem('megarasa_splash_seen');
    if (!hasSeenSplash) {
      setShouldRender(true);
      setIsVisible(true);

      // Start fade out after 1.4 seconds
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('megarasa_splash_seen', 'true');
      }, 1400);

      // Completely unmount after transition completes (1.9 seconds total)
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 1900);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#23150e] text-white transition-opacity duration-500 ease-out pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Heritage background subtle motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b43a22_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

      <div className="relative flex flex-col items-center text-center px-6 space-y-5 animate-in zoom-in-95 duration-500">
        {/* Animated Brand Icon */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#b43a22] to-[#80220f] flex items-center justify-center text-white shadow-2xl border border-amber-500/30">
            <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-amber-200 animate-pulse" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500" />
          </span>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-amber-50 tracking-wide">
            Kantin Mega Rasa
          </h1>
          <p className="text-xs sm:text-sm text-amber-300 font-medium tracking-widest uppercase">
            {locale === 'en'
              ? 'Kota Tua Jakarta • Heritage Culinary & Event Space'
              : 'Kota Tua Jakarta • Kuliner Nusantara & Ruang Acara'}
          </p>
        </div>

        {/* Subtle Animated Progress / Loading Bar */}
        <div className="w-36 h-1 bg-amber-950/80 rounded-full overflow-hidden border border-amber-900/40 mt-2">
          <div className="h-full bg-gradient-to-r from-amber-500 to-[#b43a22] rounded-full animate-[shimmer_1.2s_infinite] w-full" />
        </div>
      </div>
    </div>
  );
}
