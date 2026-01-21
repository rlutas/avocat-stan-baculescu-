'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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
            'h-4 w-4',
            star <= rating
              ? 'fill-gold text-gold'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all hover:border-gold hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef9e7] text-lg font-semibold text-navy">
          {testimonial.authorName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-navy">{testimonial.authorName}</p>
          <p className="text-sm text-[#4b5563]">{testimonial.relativeTime}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 flex-grow text-[#4b5563] leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const locale = t('locale') === 'en' ? 'en' : 'ro';

  const testimonials = locale === 'en' ? staticTestimonialsEn : staticTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play carousel on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Google My Business URL
  const googleMapsUrl = 'https://www.google.com/maps/place/Societatea+Civil%C4%83+de+Avoca%C8%9Bi+Stan-B%C4%83culescu/@47.7897,22.8762,17z';

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            {t('subtitle')}
          </p>
          <h2 className="font-heading mb-4 text-3xl font-bold text-navy md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#4b5563]">
            {t('description')}
          </p>
        </div>

        {/* Desktop Grid (3 columns) */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-navy/10"
              aria-label={t('previous')}
            >
              <ChevronLeft className="h-5 w-5 text-navy" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index === currentIndex ? 'bg-gold' : 'bg-navy/20'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-navy/10"
              aria-label={t('next')}
            >
              <ChevronRight className="h-5 w-5 text-navy" />
            </button>
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-navy text-navy hover:bg-navy hover:text-white"
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
    </section>
  );
}
