'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock } from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { GlowWrapper } from '@/components/ui/glow-button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { trackCtaClick, trackPhoneClick } from '@/lib/analytics';

interface CtaSectionProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  phoneText?: string;
  phoneHref?: string;
  availableText?: string;
  callLabel?: string;
  className?: string;
  imagePosition?: string;
}

export function CtaSection({
  imageSrc,
  imageAlt,
  label,
  title,
  description,
  buttonText,
  buttonHref,
  phoneText,
  phoneHref,
  availableText,
  callLabel,
  className,
  imagePosition,
}: CtaSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className={cn('py-20 sm:py-28', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimate variant="scaleUp" duration={0.8}>
          <div
            ref={ref}
            className="relative overflow-hidden rounded-3xl bg-navy"
          >
            {/* Grid texture overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />
            </div>

            {/* Parallax gold glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 50%, rgba(208,156,17,0.08) 0%, transparent 70%)',
                y: backgroundY,
              }}
            />

            {/* Gold shimmer top bar */}
            <div className="absolute left-0 right-0 top-0 z-20 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

            {/* Split layout */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch">
              {/* Image — left column */}
              <div className="relative h-64 w-full shrink-0 sm:h-80 lg:h-auto lg:w-[38%]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className={cn('object-cover', imagePosition || 'object-top lg:object-center')}
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                {/* Gold border accent — right edge on desktop, bottom edge on mobile */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent lg:bottom-0 lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[3px] lg:bg-gradient-to-b lg:from-transparent lg:via-gold lg:to-transparent" />
              </div>

              {/* Content — right column */}
              <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                <ScrollAnimate delay={0.1}>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                    {label}
                  </p>
                </ScrollAnimate>

                <ScrollAnimate delay={0.2}>
                  <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {title}
                  </h2>
                  <div className="mt-4 h-[2px] w-20 bg-gold" />
                </ScrollAnimate>

                <ScrollAnimate delay={0.3}>
                  <p className="mb-10 mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                    {description}
                  </p>
                </ScrollAnimate>

                {/* Buttons */}
                <ScrollAnimate delay={0.4}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <GlowWrapper className="rounded-full">
                      <Button
                        asChild
                        size="lg"
                        className="group h-14 rounded-full bg-gold px-8 text-base font-semibold text-navy shadow-[var(--shadow-gold)] transition-all duration-300 hover:bg-gold-light hover:shadow-[var(--shadow-gold-lg)]"
                      >
                        <Link href={buttonHref as '/contact'} onClick={() => trackCtaClick({ cta_text: buttonText, cta_location: 'cta_section', cta_destination: buttonHref, page_type: 'unknown' })}>
                          {buttonText}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </GlowWrapper>

                    {phoneText && phoneHref && (
                      <a
                        href={phoneHref}
                        onClick={() => trackPhoneClick('cta_section', 'unknown')}
                        className="group flex h-14 items-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-gold/30 hover:shadow-lg hover:shadow-gold/20"
                      >
                        <div className="flex h-full w-12 flex-shrink-0 items-center justify-center bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20 sm:w-14">
                          <Phone className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 sm:block sm:px-5 sm:text-left">
                          {callLabel && (
                            <p className="whitespace-nowrap text-sm text-white/40 sm:text-xs">
                              {callLabel}
                            </p>
                          )}
                          <p className="whitespace-nowrap text-base font-semibold text-white sm:text-sm">
                            {phoneText}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                </ScrollAnimate>

                {availableText && (
                  <ScrollAnimate delay={0.5}>
                    <div className="mt-8 flex items-center gap-2 text-white/30">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{availableText}</span>
                    </div>
                  </ScrollAnimate>
                )}
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
