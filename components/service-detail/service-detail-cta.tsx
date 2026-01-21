'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ServiceDetailCta() {
  const t = useTranslations('ServiceDetail');

  return (
    <section className="bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading mb-4 text-3xl font-bold text-white sm:text-4xl">
          {t('cta.title')}
        </h2>
        <p className="mb-8 text-lg text-white/80">{t('cta.description')}</p>

        {/* Contact Info */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center text-white/90">
            <Phone className="mr-2 h-5 w-5 text-gold" />
            <span>+40 261-848-015</span>
          </div>
          <div className="flex items-center text-white/90">
            <Mail className="mr-2 h-5 w-5 text-gold" />
            <span>office@stanbaculescu.ro</span>
          </div>
          <div className="flex items-center text-white/90">
            <MapPin className="mr-2 h-5 w-5 text-gold" />
            <span>Str. Aurel Popp 2, Satu Mare</span>
          </div>
        </div>

        <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 shadow-[0_4px_6px_rgba(208,156,17,0.2)]">
          <Link href="/contact">{t('cta.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
