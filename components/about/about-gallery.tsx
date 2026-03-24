'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const photos: { src: string; key: string; tall?: boolean; position?: string }[] = [
  { src: '/images/galerie/echipa-grup.webp',        key: 'photo1', tall: true },
  { src: '/images/galerie/intrare-birou.webp',      key: 'photo2' },
  { src: '/images/galerie/hol-asteptare.webp',      key: 'photo3' },
  { src: '/images/galerie/sala-sedinte.webp',       key: 'photo4' },
  { src: '/images/galerie/receptie.webp',           key: 'photo5' },
  { src: '/images/galerie/birou-avocat.webp',       key: 'photo6' },
  { src: '/images/galerie/logo-perete.webp',        key: 'photo7', position: 'top' },
  { src: '/images/galerie/consultanta.webp',        key: 'photo8' },
  { src: '/images/galerie/statuia-justitiei.webp',  key: 'photo9' },
  { src: '/images/galerie/sala-conferinte.webp',    key: 'photo10' },
  { src: '/images/galerie/detaliu-decor.webp',      key: 'photo11' },
  { src: '/images/galerie/coduri-juridice.webp',    key: 'photo12' },
];

function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  getAlt,
}: {
  items: { src: string; key: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  getAlt: (key: string) => string;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  const photo = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Închide"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Poza anterioară"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image */}
      <div
        className="relative mx-16 h-[80vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={getAlt(photo.key)}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-4"
        aria-label="Poza următoare"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Caption + counter */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sm font-medium text-white/90">{getAlt(photo.key)}</p>
        <p className="mt-1 text-xs text-white/50">{currentIndex + 1} / {items.length}</p>
      </div>
    </div>
  );
}

export function AboutGallery() {
  const t = useTranslations('AboutPage.gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, []);
  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, []);

  return (
    <>
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
            {photos.map((photo, index) => (
              <StaggerItem
                key={photo.key}
                variant="scaleUp"
                className={photo.tall ? 'row-span-2' : ''}
              >
                <button
                  onClick={() => openLightbox(index)}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-navy text-left"
                >
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
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${photo.position ? `object-${photo.position}` : ''}`}
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
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Bottom transition line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          getAlt={(key) => t(key)}
        />
      )}
    </>
  );
}
