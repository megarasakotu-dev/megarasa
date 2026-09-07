'use client';

import { useLocale } from 'next-intl';
import { trackWhatsAppClick } from '@/lib/gtm';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const locale = useLocale();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';

  const defaultMsg =
    locale === 'en'
      ? 'Hello Kantin Mega Rasa Kota Tua, I would like to inquire about table booking or event room rental.'
      : 'Halo Kantin Mega Rasa Kota Tua, saya ingin tanya informasi reservasi meja makan atau sewa ruang acara.';

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMsg)}`;

  const handleClick = () => {
    trackWhatsAppClick('floating_button', 'Floating WhatsApp Bar');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on larger screens */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="hidden sm:inline-flex items-center gap-2 bg-white/95 text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-stone-200/80 hover:bg-stone-50 transition-all hover:scale-102"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>
          {locale === 'en' ? 'Chat WhatsApp with us' : 'Chat WhatsApp kami'}
        </span>
      </a>

      {/* Floating Circular Icon */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat WhatsApp Kantin Mega Rasa"
        className="relative group w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/80"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
