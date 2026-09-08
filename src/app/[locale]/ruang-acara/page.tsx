import Image from 'next/image';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getEventSpace, getEventPackages } from '@/lib/data-service';
import EventBookingCta from '@/components/EventBookingCta';
import {
  Building2,
  Users,
  Clock,
  CheckCircle2,
  Tv,
  Mic,
  Wifi,
  Wind,
  Sparkles,
  CalendarCheck,
  Coffee,
  Utensils,
  PartyPopper,
  Briefcase,
  Layers,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'eventSpace' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'sewa ruang acara kota tua',
      'sewa tempat gathering jakarta kota',
      'ruang meeting kota tua jakarta',
      'sewa ruang arisan kota tua',
      'venue reuni kota tua',
      'event space kota tua jakarta',
    ],
  };
}

export default async function EventSpacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('eventSpace');
  const tCommon = await getTranslations('common');
  const [eventSpace, packages] = await Promise.all([
    getEventSpace(),
    getEventPackages(),
  ]);

  const spaceName = locale === 'en' ? eventSpace.name_en : eventSpace.name_id;
  const tagline = locale === 'en' ? eventSpace.tagline_en : eventSpace.tagline_id;
  const description =
    locale === 'en' ? eventSpace.description_en : eventSpace.description_id;
  const facilities =
    locale === 'en' ? eventSpace.facilities_en : eventSpace.facilities_id;
  const suitableEvents =
    locale === 'en' ? eventSpace.suitable_events_en : eventSpace.suitable_events_id;

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* 1. Header & Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2e180e] tracking-tight">
            {t('title')}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-900/10 bg-stone-900">
            <Image
              src={eventSpace.primary_image_url}
              alt={spaceName}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                {locale === 'en' ? 'Exclusive 2nd Floor' : 'Lantai 2 Privat & Ber-AC'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                {spaceName}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                {tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {eventSpace.gallery_image_urls.slice(1, 3).map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-16/10 md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-md border border-amber-900/10"
              >
                <Image
                  src={url}
                  alt={`${spaceName} view ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Specs Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-[#b43a22] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">
                {t('capacityLabel')}
              </span>
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                {eventSpace.capacity_min} - {eventSpace.capacity_max} {locale === 'en' ? 'Guests' : 'Orang'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">
                {locale === 'en' ? 'Minimum Booking' : 'Minimal Sewa'}
              </span>
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                {eventSpace.minimum_hours} {locale === 'en' ? 'Hours' : 'Jam'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#d97706] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">
                {t('pricingLabel')}
              </span>
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                Rp {eventSpace.hourly_rate.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-[#b43a22] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">
                {locale === 'en' ? 'Floor Location' : 'Posisi Ruangan'}
              </span>
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                {locale === 'en' ? '2nd Floor (Private)' : 'Lantai 2 (Privat)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Description & Suitable Event Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Detailed Story */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e180e]">
              {locale === 'en'
                ? 'A Historic & Intimate Venue for Your Meaningful Gatherings'
                : 'Ruang Pertemuan Bernuansa Hangat di Jantung Kota Tua'}
            </h2>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {description}
            </p>

            {/* Quick action */}
            <div className="pt-2">
              <EventBookingCta
                waLabel={t('ctaWhatsApp')}
                formLabel={t('ctaForm')}
              />
            </div>
          </div>

          {/* Right: Suitable Events Card */}
          <div className="lg:col-span-5 bg-[#faf5ee] rounded-2xl p-6 sm:p-8 border border-amber-900/10">
            <div className="flex items-center gap-2 mb-4">
              <PartyPopper className="w-5 h-5 text-[#b43a22]" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {t('suitableEventsTitle')}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-5">
              {t('suitableEventsSubtitle')}
            </p>

            <ul className="space-y-3">
              {suitableEvents.map((evt, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-900/10 shadow-2xs text-sm font-medium text-stone-800"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-[#b43a22] flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Complete Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e180e]">
            {t('facilitiesTitle')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {t('facilitiesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-amber-900/10 shadow-xs flex items-start gap-3 hover:border-amber-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-[#b43a22] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-stone-800 leading-snug">
                {fac}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pricing & Catering Packages (Critical Component) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>{locale === 'en' ? 'Package Options' : 'Paket Sewa Lengkap'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2e180e]">
            {t('packagesTitle')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {t('packagesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const name = locale === 'en' ? pkg.name_en : pkg.name_id;
            const badge = locale === 'en' ? pkg.badge_en : pkg.badge_id;
            const features =
              locale === 'en' ? pkg.features_en : pkg.features_id;

            const isBestSeller = pkg.order_index === 3;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isBestSeller
                    ? 'bg-gradient-to-b from-[#2e180e] to-[#1a0c06] text-white shadow-2xl scale-102 lg:-translate-y-2 border-2 border-amber-500'
                    : 'bg-white text-stone-900 border border-amber-900/15 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Top Badge */}
                {badge && (
                  <div className="absolute -top-3.5 left-8">
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        isBestSeller
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-[#b43a22] text-white'
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3
                    className={`font-serif font-bold text-xl sm:text-2xl mb-3 ${
                      isBestSeller ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-stone-200/20">
                    {pkg.price_package > 0 ? (
                      <div>
                        <span
                          className={`text-xs block mb-1 font-semibold ${
                            isBestSeller ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {locale === 'en' ? 'Package Price (2 Hours)' : 'Biaya Sewa (2 Jam)'}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif font-black text-3xl sm:text-4xl text-[#b43a22] dark:text-amber-400">
                            Rp {pkg.price_package.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span
                          className={`text-xs block mb-1 font-semibold ${
                            isBestSeller ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {locale === 'en' ? 'Price per Person' : 'Harga per Orang'}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`font-serif font-black text-3xl sm:text-4xl ${
                              isBestSeller ? 'text-amber-400' : 'text-[#b43a22]'
                            }`}
                          >
                            Rp {pkg.price_per_person.toLocaleString('id-ID')}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              isBestSeller ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {tCommon('perPerson')}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex items-center gap-4 text-xs font-semibold mt-3 ${
                        isBestSeller ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      <span>⏱ {pkg.duration_hours} {locale === 'en' ? 'Hours' : 'Jam'}</span>
                      <span>👥 {tCommon('minPax', { pax: pkg.min_pax })}</span>
                    </div>
                  </div>

                  {/* Feature checklist */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isBestSeller ? 'text-amber-400' : 'text-emerald-600'
                          }`}
                        />
                        <span
                          className={isBestSeller ? 'text-stone-200' : 'text-stone-700'}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button for this package */}
                <EventBookingCta
                  packageName={name}
                  waLabel={
                    locale === 'en'
                      ? `Book ${name.split('(')[0]}`
                      : `Pesan ${name.split('(')[0]}`
                  }
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Big Final Booking CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-100 via-[#faeee0] to-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-300 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2e180e]">
              {t('bookingCtaTitle')}
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {t('bookingCtaDesc')}
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <EventBookingCta
              waLabel={t('ctaWhatsApp')}
              formLabel={t('ctaForm')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
