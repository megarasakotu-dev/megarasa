import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getFavoriteMenuItems, getEventSpace } from '@/lib/data-service';
import { HeroCtas, EventBannerCtas } from '@/components/HomeCtas';
import {
  Sparkles,
  Award,
  Users,
  UtensilsCrossed,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  Star,
  Flame,
  CheckCircle2,
  Truck,
  ShoppingBag,
} from 'lucide-react';

// Enable Edge Caching with Incremental Static Regeneration (ISR)
// Pages are served instantly from Vercel Edge CDN and revalidated in the background every 60s
export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const favoriteItems = await getFavoriteMenuItems();
  const eventSpace = await getEventSpace();

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f9f3ea] via-[#f7eee1] to-[#fdfbf8] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-amber-900/10">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#b43a22_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-[#b43a22]" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#2e180e] leading-[1.15] tracking-tight">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                {t('hero.description')}
              </p>

              {/* CTAs */}
              <HeroCtas
                menuLabel={t('hero.ctaMenu')}
                eventLabel={t('hero.ctaEvent')}
                locationLabel={t('hero.ctaLocation')}
              />

              {/* Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-amber-900/15 max-w-lg">
                <div>
                  <span className="block font-serif font-black text-2xl sm:text-3xl text-[#b43a22]">
                    {t('hero.stat1Number')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat1Label')}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-black text-2xl sm:text-3xl text-[#3d2012]">
                    {t('hero.stat2Number')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat2Label')}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-black text-2xl sm:text-3xl text-[#d97706] flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    {t('hero.stat3Number')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat3Label')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card: Culinary Highlight */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-950 aspect-4/3 group">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                    alt="Soto Betawi Kantin Mega Rasa"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#b43a22] text-xs font-bold tracking-wide uppercase mb-1">
                      {locale === 'en' ? 'Signature Dish' : 'Menu Ikonik'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">
                      {locale === 'en'
                        ? 'Authentic Soto Betawi with Coconut & Milk'
                        : 'Soto Betawi Kuah Santan Susu Autentik'}
                    </h3>
                  </div>
                </div>

                {/* Overlaid Floating Card: Upper Floor Event Space Highlight */}
                <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-amber-900/15 max-w-[280px] sm:max-w-[320px] transition-transform hover:-translate-y-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#b43a22] shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase text-amber-700 tracking-wider">
                        {locale === 'en' ? 'Private Upper Floor' : 'Lantai Atas Privat'}
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight">
                        {locale === 'en'
                          ? 'AC, Projector, Sound & WiFi'
                          : 'Full AC, Proyektor & Sound System'}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">
                        {locale === 'en'
                          ? 'Available for corporate meetings, gatherings & reunions.'
                          : 'Cocok untuk rapat kantor, reuni & arisan hingga 50 orang.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES / VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2e180e]">
            {t('features.title')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-[#b43a22] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t('features.feat1Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('features.feat1Desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t('features.feat2Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('features.feat2Desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#d97706] mb-4">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t('features.feat3Title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('features.feat3Desc')}
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-[#faefe3] border border-amber-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#b43a22] flex items-center justify-center text-white mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2e180e] mb-2">
              {t('features.feat4Title')}
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              {t('features.feat4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE / POPULAR MENU SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-2">
              {t('popularMenu.badge')}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2e180e]">
              {t('popularMenu.title')}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              {t('popularMenu.subtitle')}
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#b43a22] hover:text-[#882512] font-bold text-sm group"
          >
            <span>{t('popularMenu.viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteItems.slice(0, 4).map((item) => {
            const name = locale === 'en' ? item.name_en : item.name_id;
            const desc = locale === 'en' ? item.description_en : item.description_id;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <Image
                    src={item.image_url}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {item.is_favorite && (
                      <span className="inline-flex items-center gap-1 bg-[#b43a22] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        <Star className="w-3 h-3 fill-white" />
                        {tCommon('favoriteBadge')}
                      </span>
                    )}
                    {item.spicy_level > 0 && (
                      <span className="inline-flex items-center gap-0.5 bg-amber-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                        <Flame className="w-3 h-3 fill-white" />
                        L{item.spicy_level}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 line-clamp-1 group-hover:text-[#b43a22] transition-colors">
                      {name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-500 block">
                        {locale === 'en' ? 'Price' : 'Harga'}
                      </span>
                      <span className="font-bold text-stone-900 text-base">
                        {tCommon('currency')} {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <Link
                      href="/menu"
                      className="px-3 py-1.5 rounded-lg bg-amber-50 text-[#b43a22] hover:bg-[#b43a22] hover:text-white transition-colors text-xs font-semibold"
                    >
                      {locale === 'en' ? 'View Menu' : 'Pesan'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. UPPER FLOOR EVENT SPACE SPOTLIGHT (CRITICAL REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3b1e13] via-[#2d150c] to-[#1f0d07] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-amber-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                {t('eventBanner.badge')}
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                {t('eventBanner.title')}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {t('eventBanner.description')}
              </p>

              {/* Highlights tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  locale === 'en' ? 'Capacity 10-50 Pax' : 'Kapasitas 10-50 Orang',
                  locale === 'en' ? 'Full Cold AC' : 'Full AC Dingin Nyaman',
                  locale === 'en' ? 'HD Projector & Screen' : 'Proyektor & Screen 100"',
                  locale === 'en' ? 'Sound & Wireless Mics' : 'Sound System & 2 Mic',
                  locale === 'en' ? 'Fast Wi-Fi 100 Mbps' : 'Wi-Fi Cepat 100 Mbps',
                  locale === 'en' ? 'Buffet / Snack Options' : 'Paket Prasmanan & Snack',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-amber-100/90"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Event Banner Interactive CTAs with GTM tracking */}
              <EventBannerCtas
                detailLabel={t('eventBanner.ctaDetail')}
                waLabel={t('eventBanner.ctaWhatsApp')}
                locale={locale}
              />
            </div>

            {/* Right Images Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30">
                <Image
                  src={eventSpace.primary_image_url}
                  alt={locale === 'en' ? eventSpace.name_en : eventSpace.name_id}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
                    {locale === 'en' ? 'Private Atmosphere' : 'Privat & Nyaman'}
                  </span>
                  <span className="font-serif text-lg font-bold text-white block">
                    {locale === 'en' ? eventSpace.name_en : eventSpace.name_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NASI BOX & CATERING SPOTLIGHT (NEW FOR KOTA TUA TOURISTS & GROUPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#fcf7f0] via-[#faefe1] to-[#f4e6d4] border-2 border-amber-300/80 p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 border border-amber-400/50 text-xs font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-[#b43a22]" />
                <span>
                  {locale === 'en'
                    ? 'Tour Group Meal Box & Catering'
                    : 'Layanan Nasi Box & Katering Rombongan'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#2e180e]">
                {locale === 'en'
                  ? 'Affordable & Delicious Meal Boxes for Kota Tua Visitors'
                  : 'Nasi Box Lezat & Praktis untuk Rombongan Wisata Kota Tua'}
              </h2>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {locale === 'en'
                  ? 'Tailored for tour bus groups, school study trips, and office outings. Starting from only IDR 22,000/box for small (from 10 boxes) to large batches, with FREE delivery directly to Kota Tua meeting points!'
                  : 'Solusi konsumsi terbaik untuk rombongan bus pariwisata, study tour sekolah, arisan, maupun kantor. Mulai dari Rp 22.000/box untuk partai kecil (mulai 10 box) hingga partai besar (ratusan box), plus fasilitas GRATIS ANTAR ke titik temu wisata Kota Tua!'}
              </p>

              {/* Badges / Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {[
                  {
                    title: locale === 'en' ? 'From IDR 22K' : 'Mulai Rp 22.000',
                    desc: locale === 'en' ? 'Budget friendly' : 'Porsi komplit',
                  },
                  {
                    title: locale === 'en' ? 'From 10 Boxes' : 'Mulai 10 Box',
                    desc: locale === 'en' ? 'Small to large' : 'Partai kecil/besar',
                  },
                  {
                    title: locale === 'en' ? 'Free Delivery' : 'Gratis Antar',
                    desc: locale === 'en' ? 'Kota Tua spots' : 'Ke spot wisata',
                  },
                  {
                    title: locale === 'en' ? '100% Halal' : '100% Halal',
                    desc: locale === 'en' ? 'Freshly cooked' : 'Higienis & rapi',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/90 rounded-xl border border-amber-200/80 shadow-2xs text-center"
                  >
                    <span className="block font-serif font-black text-sm text-[#b43a22]">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-stone-600 block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/nasi-box"
                  className="px-6 py-3.5 rounded-xl bg-[#b43a22] hover:bg-[#922a15] text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {locale === 'en'
                      ? 'View Packages & Calculate Price'
                      : 'Lihat Pilihan Paket & Hitung Estimasi'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/kontak"
                  className="px-5 py-3.5 rounded-xl bg-white border border-stone-300 hover:border-[#b43a22] text-stone-800 hover:text-[#b43a22] font-semibold text-sm transition-all shadow-2xs"
                >
                  <span>{locale === 'en' ? 'Inquire via Form' : 'Tanya Rombongan'}</span>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-amber-950">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Nasi Box Kantin Mega Rasa"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    {locale === 'en' ? 'Kota Tua Catering' : 'Katering Wisatawan'}
                  </span>
                  <span className="font-serif font-bold text-base sm:text-lg block">
                    {locale === 'en'
                      ? 'Delivered fresh directly to your tour group bus or plaza.'
                      : 'Diantar hangat langsung ke bus wisata atau titik kumpul rombongan Anda.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOCATION SPOTLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block text-xs font-bold text-[#b43a22] uppercase tracking-wider">
              {t('locationBanner.badge')}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2e180e]">
              {t('locationBanner.title')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('locationBanner.description')}
            </p>
          </div>

          <Link
            href="/lokasi"
            className="shrink-0 inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <span>{t('locationBanner.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
