import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSiteSettings } from '@/lib/data-service';
import ContactForm from '@/components/ContactForm';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  UtensilsCrossed,
  Building2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'kontak kantin mega rasa',
      'reservasi makan kota tua',
      'booking sewa ruang acara kota tua',
      'whatsapp kantin mega rasa',
      'sewa tempat reuni jakarta barat',
    ],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tLoc = await getTranslations('location');
  const settings = await getSiteSettings();

  const waNumber = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';

  const waDiningUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    locale === 'en'
      ? 'Hello Kantin Mega Rasa, I would like to book a dining table.'
      : 'Halo Kantin Mega Rasa Kota Tua, saya ingin reservasi meja makan.'
  )}`;

  const waEventUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    locale === 'en'
      ? 'Hello Kantin Mega Rasa, I would like to inquire about 2nd-floor event space rental.'
      : 'Halo Kantin Mega Rasa Kota Tua, saya ingin menanyakan sewa ruang acara lantai 2.'
  )}`;

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-[#b43a22]" />
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

      {/* Main Form & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct WhatsApp & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Action Box */}
            <div className="bg-gradient-to-br from-[#2e180e] to-[#1a0c06] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-amber-900/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {t('quickChatTitle')}
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    ● Fast Response via WhatsApp
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('quickChatDesc')}
              </p>

              <div className="space-y-3 pt-1">
                <a
                  href={waDiningUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{t('waDiningBtn')}</span>
                </a>

                <a
                  href={waEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t('waEventBtn')}</span>
                </a>
              </div>
            </div>

            {/* Address & Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-4 text-stone-700 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#b43a22] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">
                    {locale === 'en' ? 'Location' : 'Alamat'}
                  </h4>
                  <p className="text-xs text-stone-600">{settings.address || tLoc('addressValue')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">
                    {locale === 'en' ? 'Service Hours' : 'Jam Operasional'}
                  </h4>
                  <p className="text-xs text-stone-600 font-semibold text-stone-800">
                    {settings.hoursWeekday || tLoc('hoursWeekday')}
                  </p>
                  <p className="text-xs text-stone-600 font-semibold text-[#b43a22]">
                    {settings.hoursWeekend || tLoc('hoursWeekend')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Email</h4>
                  <p className="text-xs text-stone-600">halo@megarasa.id</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
