import Image from 'next/image';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Globe2,
  Clock,
  Building2,
  ArrowRight,
  UtensilsCrossed,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'tentang kantin mega rasa',
      'sejarah kuliner kota tua jakarta',
      'kantin bersih kota tua',
      'kuliner ramah turis kota tua',
      'tempat makan heritage jakarta',
    ],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2e180e] tracking-tight">
            {t('title')}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Story & Visual Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photos Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Suasana Kantin Mega Rasa Kota Tua"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Kota Tua Heritage
                </span>
                <p className="text-sm font-semibold">
                  {locale === 'en'
                    ? 'Warm & historic ambiance in the heart of Old Town'
                    : 'Suasana hangat dan penuh kenangan di sudut Kota Tua'}
                </p>
              </div>
            </div>

            {/* Overlaid secondary picture */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                alt="Bumbu Rempah Segar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-5 text-stone-700 leading-relaxed text-sm sm:text-base">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2e180e] leading-snug">
              {locale === 'en'
                ? 'Preserving Authentic Flavors in Jakarta’s Old Batavia'
                : 'Menjaga Keaslian Rasa di Tengah Sejarah Batavia'}
            </h2>

            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
            <p>{t('storyP3')}</p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>{locale === 'en' ? 'Explore Our Menu' : 'Lihat Menu Kami'}</span>
              </Link>

              <Link
                href="/ruang-acara"
                className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-[#3d2012] px-5 py-3 rounded-xl font-bold text-sm border border-stone-300 shadow-xs transition-all hover:-translate-y-0.5"
              >
                <Building2 className="w-4 h-4 text-[#b43a22]" />
                <span>{locale === 'en' ? 'View Event Space' : 'Lihat Ruang Acara'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values & Strengths Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e180e]">
            {t('valuesTitle')}
          </h2>
          <p className="text-stone-600 text-sm">
            {locale === 'en'
              ? 'Our dedication to providing the finest culinary experience in Kota Tua'
              : 'Dedikasi kami untuk memberikan pengalaman kuliner terbaik di Kota Tua'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Val 1: Kebersihan */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('val1Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('val1Desc')}
            </p>
          </div>

          {/* Val 2: Ramah Wisatawan */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('val2Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('val2Desc')}
            </p>
          </div>

          {/* Val 3: Cepat & Terjangkau */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('val3Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('val3Desc')}
            </p>
          </div>

          {/* Val 4: Ruang Acara */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#b43a22] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('val4Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('val4Desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
