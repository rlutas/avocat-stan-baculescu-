'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export function ServiceDetailCta() {
  const t = useTranslations('ServiceDetail');

  return (
    <section className="relative w-full overflow-hidden bg-navy py-16 sm:py-24">
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
        .gold-decoration {
          position: absolute;
          top: 50%;
          left: 80%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(208, 156, 17, 0.2) 0%, rgba(208, 156, 17, 0.05) 50%, transparent 70%);
          animation: gold-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .gold-ring {
          position: absolute;
          top: 50%;
          left: 80%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 350px;
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Gold decorative elements */}
      <div className="gold-decoration"></div>
      <div className="gold-ring"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="animate-fade-in-up font-heading mb-4 text-3xl font-bold text-white sm:text-4xl">
          {t('cta.title')}
        </h2>
        <p className="animate-fade-in-up delay-100 mb-8 text-lg text-white/80">
          {t('cta.description')}
        </p>

        {/* Contact Info */}
        <div className="animate-fade-in-up delay-200 mb-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center rounded-xl bg-white/5 px-4 py-3 text-white/90 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-gold/30">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
              <Phone className="h-5 w-5 text-gold" />
            </div>
            <span>+40 745 466 720</span>
          </div>
          <div className="flex items-center rounded-xl bg-white/5 px-4 py-3 text-white/90 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-gold/30">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
              <Mail className="h-5 w-5 text-gold" />
            </div>
            <span>office@stanbaculescu.ro</span>
          </div>
          <div className="flex items-center rounded-xl bg-white/5 px-4 py-3 text-white/90 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-gold/30">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <span>Str. Decebal Nr. 4, Satu Mare</span>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="animate-fade-in-up animate-pulse-glow delay-300 bg-gold text-navy hover:bg-gold/90"
        >
          <Link href="/contact" className="inline-flex items-center gap-2">
            {t('cta.button')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
