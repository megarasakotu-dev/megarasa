'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { MenuCategory, MenuItem } from '@/lib/mock-data';
import { trackWhatsAppClick } from '@/lib/gtm';
import { Star, Flame, MessageCircle, Sparkles } from 'lucide-react';

export default function MenuCatalog({
  categories,
  menuItems,
}: {
  categories: MenuCategory[];
  menuItems: MenuItem[];
}) {
  const locale = useLocale();
  const t = useTranslations('menu');
  const tCommon = useTranslations('common');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category_slug === selectedCategory);

  const handleOrderWa = (itemName: string) => {
    trackWhatsAppClick('menu_item_order', `Order - ${itemName}`);
    const message =
      locale === 'en'
        ? `Hello Kantin Mega Rasa Kota Tua, I am interested in ordering: "${itemName}". Is it available?`
        : `Halo Kantin Mega Rasa Kota Tua, saya ingin memesan/menanyakan ketersediaan menu: "${itemName}".`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#b43a22] text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
          }`}
        >
          {t('filterAll')} ({menuItems.length})
        </button>

        {categories.map((cat) => {
          const catName = locale === 'en' ? cat.name_en : cat.name_id;
          const count = menuItems.filter(
            (item) => item.category_slug === cat.slug
          ).length;

          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#b43a22] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              {catName} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Menu Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
          <p className="text-stone-500">{t('noItemFound')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const name = locale === 'en' ? item.name_en : item.name_id;
            const desc =
              locale === 'en' ? item.description_en : item.description_id;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with badging */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <Image
                      src={item.image_url}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.is_favorite && (
                        <span className="inline-flex items-center gap-1 bg-[#b43a22] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                          <Star className="w-3.5 h-3.5 fill-white" />
                          {tCommon('favoriteBadge')}
                        </span>
                      )}
                      {item.spicy_level > 0 && (
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                          <Flame className="w-3.5 h-3.5 fill-white" />
                          L{item.spicy_level}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#b43a22] transition-colors leading-snug">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Footer Price & WhatsApp Order */}
                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-stone-500 block uppercase font-semibold">
                        {locale === 'en' ? 'Price' : 'Harga'}
                      </span>
                      <span className="font-serif font-extrabold text-stone-950 text-lg sm:text-xl">
                        {tCommon('currency')} {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOrderWa(name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white transition-all text-xs font-bold shadow-xs cursor-pointer"
                      title={t('orderViaWA')}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{locale === 'en' ? 'Order' : 'Pesan'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
