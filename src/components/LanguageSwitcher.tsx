'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="inline-flex items-center bg-amber-50/80 border border-amber-200/80 rounded-full p-1 text-xs font-semibold shadow-xs">
      <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-amber-900/70" />
      <button
        onClick={() => toggleLanguage('id')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          locale === 'id'
            ? 'bg-[#b43a22] text-white shadow-xs font-bold'
            : 'text-amber-950 hover:text-[#b43a22]'
        }`}
        title="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          locale === 'en'
            ? 'bg-[#b43a22] text-white shadow-xs font-bold'
            : 'text-amber-950 hover:text-[#b43a22]'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
