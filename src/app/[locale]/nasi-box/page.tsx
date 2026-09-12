import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getNasiBoxPackages, getSiteSettings } from '@/lib/data-service';
import NasiBoxOrderCard from '@/components/NasiBoxOrderCard';
import {
  Sparkles,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nasiBox' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [
        {
          url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: 'Nasi Box Kantin Mega Rasa Kota Tua',
        },
      ],
    },
  };
}

export default async function NasiBoxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('nasiBox');
  const packages = await getNasiBoxPackages();
  const settings = await getSiteSettings();

  const waNumber =
    settings.whatsappNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '6281299887766';

  const customWaUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    locale === 'en'
      ? 'Hello Kantin Mega Rasa, I would like to consult on a custom meal box menu / large group catering order in Kota Tua.'
      : 'Halo Kantin Mega Rasa, saya ingin konsultasi menu khusus nasi box / pesanan katering rombongan besar di Kota Tua.'
  )}`;

  return (
    <div className="space-y-20 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f9f3ea] via-[#f7eee1] to-[#fdfbf8] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-amber-900/10">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#b43a22_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Hero Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs">
                <Truck className="w-4 h-4 text-[#b43a22]" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#2e180e] leading-[1.15] tracking-tight">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#order-section"
                  className="px-6 py-3.5 rounded-xl bg-[#b43a22] hover:bg-[#922a15] text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('hero.ctaOrder')}</span>
                </a>

                <a
                  href="#catalog-section"
                  className="px-6 py-3.5 rounded-xl bg-white border border-stone-300 hover:border-[#b43a22] text-stone-800 hover:text-[#b43a22] font-semibold text-sm shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <span>{t('hero.ctaPackages')}</span>
                </a>
              </div>

              {/* 3 Stats Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-amber-900/15 max-w-lg">
                <div>
                  <span className="block font-serif font-black text-xl sm:text-2xl text-[#b43a22]">
                    {t('hero.stat1')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat1Desc')}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-black text-xl sm:text-2xl text-[#3d2012]">
                    {t('hero.stat2')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat2Desc')}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-black text-xl sm:text-2xl text-emerald-700">
                    {t('hero.stat3')}
                  </span>
                  <span className="text-xs text-stone-600 font-medium leading-tight block">
                    {t('hero.stat3Desc')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-950 aspect-4/3 group">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                    alt="Nasi Box Kantin Mega Rasa"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-600 text-[11px] font-bold uppercase tracking-wider mb-2">
                      {locale === 'en' ? 'Free Delivery' : 'Gratis Antar Kota Tua'}
                    </span>
                    <p className="font-serif font-bold text-lg sm:text-xl leading-snug">
                      {locale === 'en'
                        ? 'Fresh, warm, and conveniently delivered to your tour stop.'
                        : 'Hangat, fresh setiap hari, dan diantar tepat waktu ke rombongan Anda.'}
                    </p>
                  </div>
                </div>

                {/* Floating Highlights Card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3.5 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-[#b43a22] shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      {locale === 'en' ? '100% Halal Certified' : '100% Halal & Higienis'}
                    </span>
                    <span className="text-[11px] text-stone-500 block leading-tight">
                      {locale === 'en' ? 'Box with individual sealed cutlery' : 'Kotak sekat rapi + sendok tisu higienis'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENEFITS / MENGAPA MEMILIH NASI BOX KAMI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2e180e]">
            {t('benefits.title')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center font-bold text-xl mb-4 font-serif">
              Rp
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
              {t('benefits.b1Title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('benefits.b1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
              {t('benefits.b2Title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('benefits.b2Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
              {t('benefits.b3Title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('benefits.b3Desc')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
              {t('benefits.b4Title')}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t('benefits.b4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DELIVERY SPOTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                <Truck className="w-3.5 h-3.5" />
                <span>{locale === 'en' ? 'Kota Tua Area Delivery' : 'Area Pengantaran Gratis'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2e180e]">
                {t('deliverySpots.title')}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {t('deliverySpots.desc')}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                locale === 'en' ? 'Fatahillah Square (Museum Sejarah)' : 'Plaza Taman Fatahillah (Depan Museum Sejarah)',
                locale === 'en' ? 'Jakarta Kota Station (Beos Main Gate)' : 'Stasiun Jakarta Kota (Pintu Beos)',
                locale === 'en' ? 'Cengkeh Tour Bus Parking Lot' : 'Kantong Parkir Bus Pariwisata Cengkeh',
                locale === 'en' ? 'Wayang & Bank Mandiri Museums' : 'Museum Wayang & Bank Mandiri',
                locale === 'en' ? 'Kota Intan Drawbridge & Waterfront' : 'Jembatan Kota Intan & Kali Besar',
                locale === 'en' ? 'Hotels & Offices around Kota Tua' : 'Kantor & Penginapan Sekitar Kota Tua',
              ].map((spot, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-amber-200/80 shadow-2xs"
                >
                  <MapPin className="w-4 h-4 text-[#b43a22] shrink-0" />
                  <span className="text-xs font-semibold text-stone-800">{spot}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PACKAGES & INTERACTIVE ORDER CALCULATOR COMPONENT */}
      <div id="catalog-section" className="scroll-mt-24">
        <div id="order-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NasiBoxOrderCard
            packages={packages}
            locale={locale}
            whatsappNumber={waNumber}
          />
        </div>
      </div>

      {/* 5. CUSTOM CATERING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#3d2012] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-900/40 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {locale === 'en' ? 'Custom Catering Solutions' : 'Katering & Penyesuaian Anggaran'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {t('customEvent.title')}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {t('customEvent.description')}
            </p>
          </div>

          <a
            href={customWaUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5 fill-stone-950 text-stone-950" />
            <span>{t('customEvent.cta')}</span>
          </a>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>FAQ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2e180e]">
            {t('faq.title')}
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { q: t('faq.q1'), a: t('faq.a1') },
            { q: t('faq.q2'), a: t('faq.a2') },
            { q: t('faq.q3'), a: t('faq.a3') },
            { q: t('faq.q4'), a: t('faq.a4') },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-2"
            >
              <h4 className="font-serif font-bold text-base text-stone-900 flex items-start gap-2">
                <span className="text-[#b43a22] font-black">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
