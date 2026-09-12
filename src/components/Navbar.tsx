'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { trackRentEventSpace } from '@/lib/gtm';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, UtensilsCrossed, CalendarClock, Phone } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/menu', label: t('menu') },
    { href: '/nasi-box', label: t('nasiBox') },
    { href: '/ruang-acara', label: t('eventSpace') },
    { href: '/lokasi', label: t('location') },
    { href: '/tentang-kami', label: t('about') },
    { href: '/kontak', label: t('contact') },
  ];

  const handleCtaClick = () => {
    trackRentEventSpace('navbar_cta_button');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf8]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b43a22] to-[#80220f] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[#3d2012] block leading-none">
                {tBrand('name')}
              </span>
              <span className="text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-amber-800/80 block mt-1">
                {tBrand('location')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#b43a22] font-bold bg-amber-100/60 shadow-xs'
                      : 'text-[#4a3429] hover:text-[#b43a22] hover:bg-amber-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Lang Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              href="/ruang-acara"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <CalendarClock className="w-4 h-4" />
              <span>{t('bookNow')}</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3d2012] hover:bg-amber-100/60 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-900/10 bg-[#fbf7ee] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#b43a22] text-white font-semibold'
                    : 'text-[#3d2012] hover:bg-amber-100/70'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-amber-900/10 flex flex-col gap-2">
            <Link
              href="/ruang-acara"
              onClick={() => {
                handleCtaClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#b43a22] text-white py-3 rounded-xl font-semibold shadow-md"
            >
              <CalendarClock className="w-5 h-5" />
              <span>{t('bookNow')}</span>
            </Link>

            <Link
              href="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 border border-[#b43a22] text-[#b43a22] py-2.5 rounded-xl font-medium"
            >
              <Phone className="w-4 h-4" />
              <span>{t('contact')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
