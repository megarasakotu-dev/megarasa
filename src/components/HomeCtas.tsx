'use client';

import { Link } from '@/i18n/routing';
import { trackViewMenu, trackRentEventSpace, trackWhatsAppClick } from '@/lib/gtm';
import { ArrowRight, CalendarClock, Utensils, MessageCircle, MapPin } from 'lucide-react';

export function HeroCtas({
  menuLabel,
  eventLabel,
  locationLabel,
}: {
  menuLabel: string;
  eventLabel: string;
  locationLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-4">
      <Link
        href="/menu"
        onClick={() => trackViewMenu('hero_primary_button')}
        className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#962c16] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
      >
        <Utensils className="w-5 h-5 text-amber-200" />
        <span>{menuLabel}</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>

      <Link
        href="/ruang-acara"
        onClick={() => trackRentEventSpace('hero_secondary_button')}
        className="inline-flex items-center gap-2 bg-[#422214] hover:bg-[#2e160c] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-amber-900/20"
      >
        <CalendarClock className="w-5 h-5 text-amber-300" />
        <span>{eventLabel}</span>
      </Link>

      <Link
        href="/lokasi"
        className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-stone-800 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-sm border border-stone-300 hover:border-amber-700/50 transition-all hover:-translate-y-0.5"
      >
        <MapPin className="w-4 h-4 text-[#b43a22]" />
        <span>{locationLabel}</span>
      </Link>
    </div>
  );
}

export function EventBannerCtas({
  detailLabel,
  waLabel,
  locale,
}: {
  detailLabel: string;
  waLabel: string;
  locale: string;
}) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';
  const prefilled =
    locale === 'en'
      ? 'Hello Kantin Mega Rasa, I would like to inquire about renting the 2nd-floor event space for an upcoming event.'
      : 'Halo Kantin Mega Rasa, saya ingin menanyakan jadwal ketersediaan sewa ruang acara lantai 2 untuk rencana acara kami.';

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(prefilled)}`;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Link
        href="/ruang-acara"
        onClick={() => trackRentEventSpace('home_event_banner_detail')}
        className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
      >
        <CalendarClock className="w-4 h-4 text-amber-200" />
        <span>{detailLabel}</span>
      </Link>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('event_banner', 'Home Event Section WA')}
        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4" />
        <span>{waLabel}</span>
      </a>
    </div>
  );
}
