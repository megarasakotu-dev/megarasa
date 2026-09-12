'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getSiteSettings, SiteSettings } from '@/lib/data-service';
import { UtensilsCrossed, MapPin, Phone, Clock, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const tLoc = useTranslations('location');
  const locale = useLocale();

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const waNumber =
    settings?.whatsappNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '6281299887766';

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    locale === 'en'
      ? 'Hello Kantin Mega Rasa Kota Tua, I would like to inquire about your menu and event space.'
      : 'Halo Kantin Mega Rasa Kota Tua, saya ingin menanyakan informasi menu dan sewa ruang acara.'
  )}`;

  return (
    <footer className="bg-[#241711] text-[#e8ded7] pt-16 pb-12 border-t-4 border-[#b43a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-950/40">
          {/* Col 1: Brand story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b43a22] flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wide">
                {tBrand('name')}
              </span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-[#b43a22] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-[#b43a22] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-800/80 text-emerald-200 flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Nav Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-amber-200 tracking-wide">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-300 transition-colors">
                  {tNav('menu')}
                </Link>
              </li>
              <li>
                <Link href="/nasi-box" className="hover:text-amber-300 transition-colors">
                  {tNav('nasiBox')}
                </Link>
              </li>
              <li>
                <Link href="/ruang-acara" className="hover:text-amber-300 transition-colors">
                  {tNav('eventSpace')}
                </Link>
              </li>
              <li>
                <Link href="/lokasi" className="hover:text-amber-300 transition-colors">
                  {tNav('location')}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-amber-300 transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-amber-300 transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-stone-400 hover:text-amber-400 transition-colors text-xs inline-flex items-center gap-1 pt-1">
                  <span>🔒 Panel Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-amber-200 tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d97706]" />
              {t('operationalHours')}
            </h4>
            <div className="space-y-2.5 text-sm text-stone-300 leading-relaxed">
              <p>{settings?.hoursWeekday || tLoc('hoursWeekday')}</p>
              <p>{settings?.hoursWeekend || tLoc('hoursWeekend')}</p>
              <p className="text-xs text-amber-300/80 italic pt-1">
                {locale === 'en'
                  ? '*Upper floor event space available until 11:00 PM upon advance reservation.'
                  : '*Layanan ruang acara dapat diperpanjang hingga pukul 23.00 WIB dengan reservasi sebelumnya.'}
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-amber-200 tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d97706]" />
              {t('contactInfo')}
            </h4>
            <div className="space-y-3 text-sm text-stone-300 leading-relaxed">
              <p>{settings?.address || tLoc('addressValue')}</p>
              <p className="text-xs text-amber-300/90 font-medium">
                📍 {settings?.landmark || tLoc('landmarkValue')}
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>+{waNumber}</span>
                </a>
                <span className="inline-flex items-center gap-2 text-stone-400">
                  <Mail className="w-4 h-4" />
                  <span>halo@megarasa.id</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">
              Kota Tua Jakarta Heritage Culinary & Venue
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
