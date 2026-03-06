import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactMap,
} from '@/components/contact';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/contact`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/contact`,
        'en-US': `${BASE_URL}/en/contact`,
        'x-default': `${BASE_URL}/ro/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: { '@id': 'https://stanbaculescu.ro/#localbusiness' },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: 'Contact' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactHero />

      {/* Main Contact Section */}
      <section className="relative bg-[#f8f9fa] py-20 sm:py-28">
        {/* Subtle top line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-14 text-center sm:mb-16">
            <ScrollAnimate>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {t('sectionLabel')}
              </p>
            </ScrollAnimate>

            <ScrollAnimate delay={0.1}>
              <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
                {t('sectionTitle')}
              </h2>
              <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
            </ScrollAnimate>

            <ScrollAnimate delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                {t('sectionSubtitle')}
              </p>
            </ScrollAnimate>
          </div>

          {/* Two Column Layout: Form (60%) + Info (40%) */}
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <ContactForm />
            <ContactInfo />
          </div>

          {/* Map - integrated within the same section */}
          <div className="mt-20 sm:mt-24">
            <div className="mb-10 text-center">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('map.badge')}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h3 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
                  {t('map.title')}
                </h3>
                <div className="mx-auto mt-3 h-[2px] w-12 bg-gold" />
              </ScrollAnimate>
              <ScrollAnimate delay={0.2}>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {t('map.subtitle')}
                </p>
              </ScrollAnimate>
            </div>
            <ScrollAnimate variant="scaleUp" delay={0.3}>
              <ContactMap />
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </>
  );
}
