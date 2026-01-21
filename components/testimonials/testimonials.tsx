'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Quote,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  date: string;
  relativeTime: string;
}

// Static testimonials as fallback (curated from Google Reviews)
const staticTestimonials: Testimonial[] = [
  {
    id: '1',
    authorName: 'Maria P.',
    rating: 5,
    text: 'Profesionalism desavarsit! Echipa de avocati m-a ajutat enorm intr-un caz de drept civil foarte complex. Recomand cu caldura!',
    date: '2024-11-15',
    relativeTime: '2 luni in urma',
  },
  {
    id: '2',
    authorName: 'Ioan D.',
    rating: 5,
    text: 'Am apelat la cabinetul Stan-Baculescu pentru un caz de malpraxis medical. Rezultatul a fost excelent, iar comunicarea impecabila.',
    date: '2024-10-20',
    relativeTime: '3 luni in urma',
  },
  {
    id: '3',
    authorName: 'Elena M.',
    rating: 5,
    text: 'Sunt foarte multumita de serviciile oferite. Avocatii sunt foarte atenti la detalii si explica totul pe intelesul clientului.',
    date: '2024-09-10',
    relativeTime: '4 luni in urma',
  },
  {
    id: '4',
    authorName: 'Alexandru V.',
    rating: 5,
    text: 'Cabinet serios si de incredere. M-au reprezentat intr-un litigiu comercial si am castigat procesul. Multumesc!',
    date: '2024-08-25',
    relativeTime: '5 luni in urma',
  },
  {
    id: '5',
    authorName: 'Cristina T.',
    rating: 5,
    text: 'Experienta excelenta! Echipa este foarte profesionista si empatica. Recomand oricui are nevoie de servicii juridice de calitate.',
    date: '2024-07-18',
    relativeTime: '6 luni in urma',
  },
];

// English translations for static testimonials
const staticTestimonialsEn: Testimonial[] = [
  {
    id: '1',
    authorName: 'Maria P.',
    rating: 5,
    text: 'Outstanding professionalism! The legal team helped me tremendously in a very complex civil law case. Highly recommended!',
    date: '2024-11-15',
    relativeTime: '2 months ago',
  },
  {
    id: '2',
    authorName: 'Ioan D.',
    rating: 5,
    text: 'I contacted Stan-Baculescu Law Firm for a medical malpractice case. The result was excellent, and communication was impeccable.',
    date: '2024-10-20',
    relativeTime: '3 months ago',
  },
  {
    id: '3',
    authorName: 'Elena M.',
    rating: 5,
    text: 'I am very satisfied with the services provided. The attorneys are very detail-oriented and explain everything clearly.',
    date: '2024-09-10',
    relativeTime: '4 months ago',
  },
  {
    id: '4',
    authorName: 'Alexandru V.',
    rating: 5,
    text: 'Serious and trustworthy firm. They represented me in a commercial dispute and I won the case. Thank you!',
    date: '2024-08-25',
    relativeTime: '5 months ago',
  },
  {
    id: '5',
    authorName: 'Cristina T.',
    rating: 5,
    text: 'Excellent experience! The team is very professional and empathetic. I recommend to anyone needing quality legal services.',
    date: '2024-07-18',
    relativeTime: '6 months ago',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-5 w-5',
            star <= rating
              ? 'fill-gold text-gold'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <div
      className="group relative flex h-full flex-col rounded-2xl border border-transparent bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl hover:ring-2 hover:ring-gold/20"
      style={{ animation: `fadeInUp 0.6s ease-out ${index * 100}ms both` }}
    >
      {/* Quote icon decoration */}
      <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Quote className="h-8 w-8 text-gold/30" />
      </div>

      {/* Author info */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fef9e7] text-lg font-bold text-navy transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_4px_6px_rgba(208,156,17,0.3)]">
          {testimonial.authorName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-navy">{testimonial.authorName}</p>
          <p className="text-sm text-[#6b7280]">{testimonial.relativeTime}</p>
        </div>
      </div>

      {/* Star rating */}
      <StarRating rating={testimonial.rating} />

      {/* Testimonial text */}
      <p className="mt-4 flex-grow text-[#4b5563] leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 rounded-b-2xl bg-gold transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const locale = t('locale') === 'en' ? 'en' : 'ro';

  const testimonials =
    locale === 'en' ? staticTestimonialsEn : staticTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Auto-play carousel on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Google My Business URL
  const googleMapsUrl =
    'https://www.google.com/maps/place/Societatea+Civil%C4%83+de+Avoca%C8%9Bi+Stan-B%C4%83culescu/@47.7897,22.8762,17z';

  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gold circle decoration - left */}
        <div
          className="absolute -left-32 top-1/4 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(208,156,17,0.4) 0%, transparent 70%)',
            animation: 'gold-pulse 6s ease-in-out infinite',
          }}
        />
        {/* Gold circle decoration - right */}
        <div
          className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(208,156,17,0.4) 0%, transparent 70%)',
            animation: 'gold-pulse 6s ease-in-out infinite 3s',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          {/* Trust badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2"
            style={{ animation: 'fadeInUp 0.6s ease-out both' }}
          >
            <MessageSquare className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-gold">
              {t('trustBadge')}
            </span>
          </div>

          {/* Two-line headline */}
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold"
            style={{ animation: 'fadeInUp 0.6s ease-out 100ms both' }}
          >
            {t('titleLine1')}
          </p>
          <h2
            className="font-heading mb-4 text-3xl font-bold text-navy md:text-4xl lg:text-5xl"
            style={{ animation: 'fadeInUp 0.6s ease-out 200ms both' }}
          >
            {t('titleLine2')}
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg text-[#4b5563]"
            style={{ animation: 'fadeInUp 0.6s ease-out 300ms both' }}
          >
            {t('description')}
          </p>
        </div>

        {/* Desktop Grid (3 columns) */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={() => setIsAutoPlaying(false)}
            onTouchEnd={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="group rounded-full bg-white p-3 shadow-md transition-all duration-300 hover:bg-gold hover:shadow-[0_4px_6px_rgba(208,156,17,0.3)]"
              aria-label={t('previous')}
            >
              <ChevronLeft className="h-5 w-5 text-navy transition-colors group-hover:text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'w-6 bg-gold'
                      : 'bg-navy/20 hover:bg-navy/40'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group rounded-full bg-white p-3 shadow-md transition-all duration-300 hover:bg-gold hover:shadow-[0_4px_6px_rgba(208,156,17,0.3)]"
              aria-label={t('next')}
            >
              <ChevronRight className="h-5 w-5 text-navy transition-colors group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Google Reviews Link */}
        <div
          className="mt-12 text-center"
          style={{ animation: 'fadeInUp 0.6s ease-out 600ms both' }}
        >
          <Button
            asChild
            className="border-2 border-gold bg-transparent text-gold transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-[0_4px_6px_rgba(208,156,17,0.3)]"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t('viewAllReviews')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gold-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
}
