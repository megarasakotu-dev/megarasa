import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCategories, getMenuItems } from '@/lib/data-service';
import MenuCatalog from '@/components/MenuCatalog';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

// Cache menu catalog on CDN edge with 60s background revalidation
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'menu' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'menu kantin mega rasa',
      'kuliner kota tua jakarta',
      'soto betawi kota tua',
      'kerak telor kota tua',
      'bir pletok jakarta',
      'makanan khas betawi jakarta barat',
    ],
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('menu');
  const [categories, menuItems] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2e180e] tracking-tight">
            {t('title')}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Dynamic Menu Catalog */}
        <MenuCatalog categories={categories} menuItems={menuItems} />
      </div>
    </div>
  );
}
