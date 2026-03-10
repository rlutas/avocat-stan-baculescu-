'use client';

import { useTranslations } from 'next-intl';
import { CtaSection } from '@/components/ui/cta-section';

export function ServicesCta() {
  const t = useTranslations('ServicesPage.cta');

  return (
    <CtaSection
      imageSrc="/images/team/echipa-cta.webp"
      imageAlt="Echipa Stan-Baculescu"
      label={t('label')}
      title={t('title')}
      description={t('description')}
      buttonText={t('button')}
      buttonHref="/contact"
      phoneText="+40 745 466 720"
      phoneHref="tel:+40745466720"
      callLabel={t('callLabel')}
      availableText={t('available')}
    />
  );
}
