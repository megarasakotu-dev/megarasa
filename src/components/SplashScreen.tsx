'use client';

import { useState, useEffect } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function SplashScreen() {
  const [isDismissing, setIsDismissing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Check if user already saw the splash screen this session
    const hasSeenSplash = sessionStorage.getItem('megarasa_splash_seen');
    if (hasSeenSplash) {
      setIsRemoved(true);
      document.documentElement.classList.remove('splash-active');
      return;
    }

    // Keep splash screen visible for 1.3s, then trigger smooth fade out
    const fadeTimer = setTimeout(() => {
      setIsDismissing(true);
      sessionStorage.setItem('megarasa_splash_seen', 'true');
      document.documentElement.classList.remove('splash-active');
    }, 1300);

    // Completely remove from DOM after fade-out transition finishes
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#23150e] text-white transition-all duration-500 ease-out select-none ${
        isDismissing ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Heritage background subtle motif */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b43a22_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center px-6 space-y-6 animate-in fade-in zoom-in-95 duration-400">
        {/* Animated Brand Icon */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#b43a22] to-[#781e0c] flex items-center justify-center text-white shadow-2xl border-2 border-amber-500/40 animate-mega-pulse">
            <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-amber-100" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 shadow-md" />
          </span>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2 max-w-sm sm:max-w-md">
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-amber-50 tracking-wide drop-shadow-sm">
            Kantin Mega Rasa
          </h1>
          <p className="text-xs sm:text-sm text-amber-300/90 font-semibold tracking-wider uppercase">
            {locale === 'en'
              ? 'Kota Tua Jakarta • Heritage Culinary & Event Space'
              : 'Kota Tua Jakarta • Kuliner Nusantara & Ruang Acara'}
          </p>
        </div>

        {/* Shimmering Progress Indicator */}
        <div className="w-40 h-1.5 bg-amber-950/90 rounded-full overflow-hidden border border-amber-900/60 relative mt-3 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-[#b43a22] to-amber-400 rounded-full animate-mega-shimmer w-full" />
        </div>
      </div>
    </div>
  );
}
