import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  MapPin,
  Clock,
  Train,
  Bus,
  Car,
  ExternalLink,
  Navigation,
  Compass,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'location' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: [
      'lokasi kantin mega rasa',
      'alamat kuliner kota tua',
      'tempat makan dekat stasiun kota',
      'jam buka kantin kota tua',
      'peta museum fatahillah',
    ],
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('location');

  const googleMapsUrl =
    'https://maps.google.com/?q=Taman+Fatahillah+Kota+Tua+Jakarta';

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#b43a22]" />
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

      {/* Main Info Cards & Google Maps Embed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-[#b43a22]">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {t('addressTitle')}
                  </h3>
                  <span className="text-xs text-stone-500">
                    {locale === 'en' ? 'Kota Tua Heritage District' : 'Kawasan Bersejarah Kota Tua'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">
                {t('addressValue')}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                <span className="font-bold block mb-1">📍 {t('landmarkTitle')}:</span>
                {t('landmarkValue')}
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('openInMaps')}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {t('hoursTitle')}
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold">
                    ● {locale === 'en' ? 'Open Daily' : 'Buka Setiap Hari'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-sm text-stone-700">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-medium text-stone-600">
                    {locale === 'en' ? 'Monday – Friday' : 'Senin – Jumat'}
                  </span>
                  <span className="font-bold text-stone-900">08:00 – 21:00 WIB</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-medium text-stone-600">
                    {locale === 'en' ? 'Saturday – Sunday / Holidays' : 'Sabtu – Minggu / Libur'}
                  </span>
                  <span className="font-bold text-[#b43a22]">07:30 – 22:00 WIB</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 italic pt-1">
                {locale === 'en'
                  ? '*Special event space bookings can be arranged outside regular hours.'
                  : '*Pemesanan ruang acara dapat disesuaikan di luar jam reguler sesuai perjanjian.'}
              </p>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-lg h-[460px] sm:h-[550px] relative">
            {/* Interactive Embed iframe of Kota Tua Jakarta */}
            <iframe
              title="Peta Lokasi Kantin Mega Rasa Kota Tua"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0353457997626!2d106.81156827590892!3d-6.134063860136209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6029baec3f3%3A0xbbfbbf861ff59a03!2sTaman%20Fatahillah!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Transit & Access Guide Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2e180e]">
            {t('accessTitle')}
          </h2>
          <p className="text-stone-600 text-sm">
            {locale === 'en'
              ? 'Convenient public and private transport options to reach us'
              : 'Pilihan akses mudah dengan transportasi umum maupun kendaraan pribadi'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Access 1: KRL Commuter */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('accessKrlTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('accessKrlDesc')}
            </p>
          </div>

          {/* Access 2: TransJakarta Bus */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('accessTjTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('accessTjDesc')}
            </p>
          </div>

          {/* Access 3: Car & Parking */}
          <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t('accessCarTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('accessCarDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
