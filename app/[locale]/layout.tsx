import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { GTMProvider } from '@/components/analytics';
import { OrganizationSchema } from '@/components/seo';
import '../globals.css';

const BASE_URL = 'https://stanbaculescu.ro';

const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'block',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Stan-Baculescu | Societate Civila de Avocati',
    template: '%s | Stan-Baculescu',
  },
  description:
    'Cabinet de avocatura Stan-Baculescu din Satu Mare. Servicii juridice profesionale: malpraxis medical, drept civil, drept penal, drept al familiei, dreptul muncii, drept comercial.',
  keywords: [
    'avocat Satu Mare',
    'cabinet avocatura',
    'Stan-Baculescu',
    'malpraxis medical',
    'drept civil',
    'drept penal',
    'drept familie',
    'dreptul muncii',
    'avocat Romania',
  ],
  authors: [{ name: 'Stan-Baculescu' }],
  creator: 'Stan-Baculescu Law Firm',
  publisher: 'Stan-Baculescu Law Firm',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Stan-Baculescu Law Firm',
    title: 'Stan-Baculescu | Societate Civila de Avocati',
    description:
      'Cabinet de avocatura profesional din Satu Mare. Servicii juridice complete pentru persoane fizice si juridice.',
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Stan-Baculescu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stan-Baculescu | Societate Civila de Avocati',
    description: 'Cabinet de avocatura profesional din Satu Mare.',
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Replace with actual Google Search Console verification code
    // Get it from: Google Search Console > Settings > Ownership verification > HTML tag
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'ro-RO': `${BASE_URL}/ro`,
      'en-US': `${BASE_URL}/en`,
      'x-default': `${BASE_URL}/ro`,
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Provide all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <OrganizationSchema />
        <link rel="preload" href="/images/team/camelia-stan.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/team/vlad-baculescu.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <GTMProvider />
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
