'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ServiceDetailCta() {
  const t = useTranslations('ServiceDetail');

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          {t('cta.title')}
        </h2>
        <p className="mb-8 text-lg text-slate-300">{t('cta.description')}</p>

        {/* Contact Info */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center text-slate-300">
            <Phone className="mr-2 h-5 w-5 text-amber-500" />
            <span>+40 261-848-015</span>
          </div>
          <div className="flex items-center text-slate-300">
            <Mail className="mr-2 h-5 w-5 text-amber-500" />
            <span>office@stanbaculescu.ro</span>
          </div>
          <div className="flex items-center text-slate-300">
            <MapPin className="mr-2 h-5 w-5 text-amber-500" />
            <span>Str. Aurel Popp 2, Satu Mare</span>
          </div>
        </div>

        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600">
          <Link href="/contact">{t('cta.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
