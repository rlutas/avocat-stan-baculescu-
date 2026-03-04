'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Scale, Home, Briefcase, Phone, ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 25px rgba(208, 156, 17, 0.6);
          }
        }
        @keyframes number-glow {
          0%, 100% {
            text-shadow: 0 0 30px rgba(208, 156, 17, 0.3);
          }
          50% {
            text-shadow: 0 0 50px rgba(208, 156, 17, 0.5);
          }
        }
      `}</style>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold radial glow on right side */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[500px] opacity-15"
        style={{
          background:
            'radial-gradient(circle at 80% 40%, rgba(208,156,17,0.4) 0%, rgba(208,156,17,0.08) 50%, transparent 70%)',
        }}
      />

      {/* Gold shimmer top line */}
      <div className="absolute left-0 right-0 top-0 z-20 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

      {/* Noise grain SVG */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
        <filter id="notFoundNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#notFoundNoise)" />
      </svg>

      {/* Animated gold line art */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <motion.path
          d="M-50 800 Q350 400 700 500 T1450 100"
          stroke="rgba(208, 156, 17, 0.10)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3, ease: 'easeInOut', delay: 1.2 },
            opacity: { duration: 0.5, delay: 1.2 },
          }}
        />
        <motion.path
          d="M-50 830 Q350 430 700 530 T1450 130"
          stroke="rgba(208, 156, 17, 0.05)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 3.5, ease: 'easeInOut', delay: 1.5 },
            opacity: { duration: 0.5, delay: 1.5 },
          }}
        />
      </svg>

      <div className="max-w-3xl mx-auto px-4 py-16 text-center relative z-10">
        {/* Site Logo */}
        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out both',
          }}
        >
          <Image src="/images/logo.webp" alt="SCA Stan-Baculescu" width={160} height={50} className="mx-auto mb-6 brightness-0 invert" />
        </div>

        {/* Animated Scale Icon */}
        <div
          className="mb-6 flex justify-center"
          style={{
            animation: 'fadeInUp 0.8s ease-out both',
          }}
        >
          <div
            className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center"
            style={{
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            <Scale className="w-12 h-12 text-gold" />
          </div>
        </div>

        {/* 404 Number with gold glow */}
        <h1
          className="font-heading text-[120px] md:text-[180px] font-bold text-gold leading-none mb-2"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.1s both, number-glow 3s ease-in-out infinite',
          }}
        >
          404
        </h1>

        {/* Two-line title */}
        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.2s both',
          }}
        >
          <p className="text-white/60 text-lg md:text-xl mb-2">{t('titleLine1')}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mb-6">
            {t('titleLine2')}
          </h2>
        </div>

        {/* Description */}
        <p
          className="text-white/70 text-lg mb-10 max-w-xl mx-auto"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.3s both',
          }}
        >
          {t('description')}
        </p>

        {/* Primary CTA - Homepage with pulse-glow */}
        <div
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.4s both',
          }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-gold text-navy font-semibold px-8 py-4 rounded-full hover:bg-gold/90 transition-all duration-300"
            style={{
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          >
            <Home className="w-5 h-5" />
            {t('backToHome')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Divider */}
        <div
          className="relative my-10"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s both',
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-white/50 text-sm" style={{ backgroundColor: '#002a52' }}>{t('orVisit')}</span>
          </div>
        </div>

        {/* Secondary Links as cards */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.6s both',
          }}
        >
          <Link
            href="/servicii"
            className="group relative inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all duration-300">
              <Briefcase className="w-5 h-5 text-gold group-hover:text-navy transition-colors duration-300" />
            </div>
            <span>{t('viewServices')}</span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all duration-300">
              <Phone className="w-5 h-5 text-gold group-hover:text-navy transition-colors duration-300" />
            </div>
            <span>{t('contactUs')}</span>
          </Link>
        </div>

        {/* Contact info */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/50 text-sm"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.7s both',
          }}
        >
          <a href="mailto:office@stanbaculescu.ro" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Mail className="w-4 h-4" />
            office@stanbaculescu.ro
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+40745466720" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Phone className="w-4 h-4" />
            +40 745 466 720
          </a>
        </div>
      </div>
    </div>
  );
}
