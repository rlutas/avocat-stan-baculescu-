'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Scale, Home, Briefcase, Phone, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy relative overflow-hidden">
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
        @keyframes gold-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes gold-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
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
        .gold-decoration {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(208, 156, 17, 0.15) 0%, rgba(208, 156, 17, 0.05) 50%, transparent 70%);
          animation: gold-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .gold-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 2px solid rgba(208, 156, 17, 0.15);
          animation: gold-rotate 30s linear infinite;
          pointer-events: none;
        }
        .gold-ring::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(208, 156, 17, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
        }
        .gold-ring::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(208, 156, 17, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(208, 156, 17, 0.4);
        }
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration" />
      <div className="gold-ring" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 text-center relative z-10">
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
            className="group inline-flex items-center gap-2 bg-gold text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gold/90 transition-all duration-300"
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
            <span className="bg-navy px-4 text-white/50 text-sm">{t('orVisit')}</span>
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
      </div>
    </div>
  );
}
