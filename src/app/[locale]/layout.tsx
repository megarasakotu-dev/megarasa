import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import PublicShell from '@/components/PublicShell';
import { GtmHeadScript, GtmBodyNoscript } from '@/components/GtmScript';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return {
      title: {
        template: '%s | Kantin Mega Rasa Kota Tua Jakarta',
        default: 'Kantin Mega Rasa — Authentic Indonesian Cuisine & Event Space in Kota Tua Jakarta',
      },
      description:
        'Authentic Betawi culinary haven and private upper-floor event space rental in historic Kota Tua, Jakarta. Savor Soto Betawi, Kerak Telor, Bir Pletok, and host gatherings for up to 50 guests.',
      keywords: [
        'Kota Tua culinary',
        'canteen Kota Tua Jakarta',
        'event space rental Kota Tua',
        'authentic Indonesian food Kota Tua',
        'meeting room Kota Tua',
        'gathering venue Jakarta Kota',
        'Soto Betawi Kota Tua',
      ],
      alternates: {
        languages: {
          id: '/id',
          en: '/en',
        },
      },
      openGraph: {
        title: 'Kantin Mega Rasa Kota Tua Jakarta',
        description:
          'Authentic Indonesian dining and private 2nd-floor event space in historic Old Batavia, Jakarta.',
        locale: 'en_US',
        type: 'website',
      },
    };
  }

  return {
    title: {
      template: '%s | Kantin Mega Rasa Kota Tua Jakarta',
      default: 'Kantin Mega Rasa — Kuliner Autentik Nusantara & Sewa Ruang Acara di Kota Tua Jakarta',
    },
    description:
      'Pusat kuliner khas Betawi & nusantara serta persewaan ruang acara lantai 2 di kawasan wisata Kota Tua Jakarta. Menyajikan Soto Betawi, Kerak Telor, Bir Pletok, dan ruang gathering berkapasitas hingga 50 orang.',
    keywords: [
      'kuliner Kota Tua',
      'kantin Kota Tua Jakarta',
      'sewa ruang acara Kota Tua',
      'tempat makan enak Kota Tua',
      'ruang meeting Kota Tua',
      'gathering kantor Kota Tua',
      'Soto Betawi enak Jakarta Barat',
    ],
    alternates: {
      languages: {
        id: '/id',
        en: '/en',
      },
    },
    openGraph: {
      title: 'Kantin Mega Rasa Kota Tua Jakarta',
      description:
        'Kantin kuliner autentik nusantara dan persewaan ruang acara lantai atas di kawasan cagar budaya Kota Tua Jakarta.',
      locale: 'id_ID',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <GtmHeadScript />
      </head>
      <body className="antialiased bg-[#fdfbf8] text-[#2c1e17] selection:bg-[#b43a22] selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <GtmBodyNoscript />
        <NextIntlClientProvider messages={messages}>
          <PublicShell>{children}</PublicShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
