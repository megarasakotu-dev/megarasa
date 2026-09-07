'use client';

import { useLocale } from 'next-intl';
import { trackWhatsAppClick, trackRentEventSpace } from '@/lib/gtm';
import { Link } from '@/i18n/routing';
import { MessageCircle, FileText } from 'lucide-react';

export default function EventBookingCta({
  packageName,
  waLabel,
  formLabel,
}: {
  packageName?: string;
  waLabel: string;
  formLabel?: string;
}) {
  const locale = useLocale();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';

  const message = packageName
    ? locale === 'en'
      ? `Hello Kantin Mega Rasa, I would like to inquire about booking the "${packageName}" for our event at Kota Tua.`
      : `Halo Kantin Mega Rasa, saya ingin menanyakan booking "${packageName}" untuk rencana acara kami di lantai atas Kota Tua.`
    : locale === 'en'
    ? `Hello Kantin Mega Rasa, I would like to check date availability for renting the 2nd-floor event space.`
    : `Halo Kantin Mega Rasa, saya ingin mengecek ketersediaan tanggal untuk sewa ruang acara lantai 2.`;

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  const handleWaClick = () => {
    trackWhatsAppClick('event_space_booking', packageName || 'General Event Booking');
  };

  const handleFormClick = () => {
    trackRentEventSpace('event_page_form_button');
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWaClick}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        <span>{waLabel}</span>
      </a>

      {formLabel && (
        <Link
          href="/kontak"
          onClick={handleFormClick}
          className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-stone-800 px-5 py-3 rounded-xl font-semibold text-sm border border-stone-300 shadow-xs transition-all hover:-translate-y-0.5"
        >
          <FileText className="w-4 h-4 text-[#b43a22]" />
          <span>{formLabel}</span>
        </Link>
      )}
    </div>
  );
}
