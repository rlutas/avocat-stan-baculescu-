'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Clock, Award, Phone } from 'lucide-react';

const founders = [
  {
    id: 'camelia-stan',
    name: 'Camelia Stan',
    image: '/images/team/camelia-stan.png',
  },
  {
    id: 'vlad-baculescu',
    name: 'Vlad Baculescu',
    image: '/images/team/vlad-baculescu.png',
  },
];

export function Hero() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative w-full bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:py-20">

          {/* Left Content */}
          <div className="max-w-xl">
            {/* Trust Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">15+ ani de excelență juridică</span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>

            {/* Description */}
            <p className="mb-8 text-base leading-relaxed text-white/70 sm:text-lg">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gold px-8 text-sm font-semibold text-navy hover:bg-gold-light sm:text-base"
              >
                <Link href="/contact">{t('cta')}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 gap-2 px-4 text-sm font-medium text-white hover:bg-white/10 hover:text-white sm:text-base"
              >
                <a href="tel:+40261848015">
                  <Phone className="h-4 w-4" />
                  <span>+40 261-848-015</span>
                </a>
              </Button>
            </div>

            {/* Operating Hours */}
            <div className="flex items-center gap-2 text-white/50">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Program: Luni - Vineri, 09:00 - 17:00</span>
            </div>
          </div>

          {/* Right Side - Founders */}
          <div className="relative hidden lg:flex lg:justify-end">
            <div className="relative flex items-end">
              {/* Founder 1 */}
              <Link
                href={`/echipa/${founders[0].id}`}
                className="group relative z-10"
              >
                <div className="relative h-[340px] w-[180px] overflow-hidden rounded-2xl bg-gradient-to-b from-navy-light/50 to-navy-light/20">
                  <Image
                    src={founders[0].image}
                    alt={founders[0].name}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="180px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 shadow-lg">
                  <span className="text-sm font-semibold text-navy">{founders[0].name}</span>
                </div>
              </Link>

              {/* Founder 2 */}
              <Link
                href={`/echipa/${founders[1].id}`}
                className="group relative -ml-6 mt-8"
              >
                <div className="relative h-[340px] w-[180px] overflow-hidden rounded-2xl bg-gradient-to-b from-navy-light/50 to-navy-light/20">
                  <Image
                    src={founders[1].image}
                    alt={founders[1].name}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="180px"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 shadow-lg">
                  <span className="text-sm font-semibold text-navy">{founders[1].name}</span>
                </div>
              </Link>

              {/* Stats card */}
              <div className="absolute -left-6 top-1/2 z-20 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                    <span className="text-base font-bold text-gold">1K+</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Clienți Mulțumiți</p>
                    <p className="text-xs text-gray-500">în ultimii 15 ani</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile - Founders */}
          <div className="flex items-center justify-center gap-8 lg:hidden">
            {founders.map((founder) => (
              <Link
                key={founder.id}
                href={`/echipa/${founder.id}`}
                className="group flex flex-col items-center gap-2"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/30 transition-all group-hover:border-gold">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
                <span className="text-xs font-medium text-white/70 group-hover:text-gold">
                  {founder.name}
                </span>
              </Link>
            ))}
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1K+</p>
              <p className="text-xs text-white/50">Clienți</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
