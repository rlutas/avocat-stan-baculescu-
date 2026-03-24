'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const photos: { src: string; key: string; tall?: boolean }[] = [
  { src: '/images/birou/birou-exterior.webp',                          key: 'photo1', tall: true },
  { src: '/images/birou/birou-exterior-panou-publicitar.webp',         key: 'photo4' },
  { src: '/images/birou/birou-intrare-parter-cu-panou-publicitar.webp', key: 'photo2' },
  { src: '/images/birou/birou-exterior-vedere-etaj1-geam.webp',        key: 'photo3' },
  { src: '/images/birou/receptie1.webp',                               key: 'photo5' },
  { src: '/images/birou/sala-asteptare.webp',                          key: 'photo6' },
];

export function AboutGallery() {
  const t = useTranslations('AboutPage.gallery');

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-32">
      {/* Subtle top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="mb-14 text-center sm:mb-16">
          <ScrollAnimate>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t('label')}
            </p>
          </ScrollAnimate>

          <ScrollAnimate delay={0.1}>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {t('subtitle')}
            </p>
          </ScrollAnimate>
        </div>

        {/* Bento / masonry grid */}
        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          staggerDelay={0.1}
        >
          {photos.map((photo) => (
            <StaggerItem
              key={photo.key}
              variant="scaleUp"
              className={photo.tall ? 'row-span-2' : ''}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl bg-navy">
                {/* Image container — tall image gets more height */}
                <div
                  className={`relative w-full ${
                    photo.tall
                      ? 'h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-[420px]'
                      : 'h-40 sm:h-48 md:h-52 lg:h-52'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={t(photo.key)}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Navy gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-xs font-medium text-white/90 sm:text-sm">
                      {t(photo.key)}
                    </p>
                  </div>

                  {/* Gold bottom line reveal on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Bottom transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
