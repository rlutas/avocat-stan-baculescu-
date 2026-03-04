'use client';

import { useTranslations } from 'next-intl';

export function ContactMap() {
  const t = useTranslations('ContactPage.map');

  const mapSrc =
    'https://maps.google.com/maps?q=SCA+Stan-Baculescu,+Satu+Mare,+Romania&t=&z=16&ie=UTF8&iwloc=B&output=embed';

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/[0.04] transition-all duration-500 hover:shadow-xl">
      <iframe
        src={mapSrc}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('title')}
        className="w-full"
      />
    </div>
  );
}
