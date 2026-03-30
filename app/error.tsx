'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

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
        @keyframes lineReveal {
          from {
            width: 0;
          }
          to {
            width: 80px;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes drawLine {
          from {
            stroke-dashoffset: 400;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .gold-line-art {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawLine 3s ease-in-out forwards;
        }
      `}</style>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gold radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(208,156,17,0.12) 0%, rgba(208,156,17,0.04) 50%, transparent 70%)',
        }}
      />

      {/* Noise grain texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
        <filter id="errorNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#errorNoise)" />
      </svg>

      {/* Gold shimmer top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(208,156,17,0.6), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }}
      />

      {/* CSS-animated gold line art */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.08]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle
          cx="250"
          cy="250"
          r="200"
          stroke="rgba(208,156,17,1)"
          strokeWidth="1"
          className="gold-line-art"
        />
        <circle
          cx="250"
          cy="250"
          r="160"
          stroke="rgba(208,156,17,1)"
          strokeWidth="0.5"
          className="gold-line-art"
          style={{ animationDelay: '0.5s' }}
        />
        <line
          x1="50"
          y1="250"
          x2="450"
          y2="250"
          stroke="rgba(208,156,17,1)"
          strokeWidth="0.5"
          className="gold-line-art"
          style={{ animationDelay: '1s' }}
        />
        <line
          x1="250"
          y1="50"
          x2="250"
          y2="450"
          stroke="rgba(208,156,17,1)"
          strokeWidth="0.5"
          className="gold-line-art"
          style={{ animationDelay: '1.2s' }}
        />
      </svg>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-16 text-center relative z-10">
        {/* Logo */}
        <div style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <Image
            src="/images/logo.webp"
            alt="Stan-Baculescu"
            width={180}
            height={60}
            className="mx-auto mb-8"
          />
        </div>

        {/* "Eroare" large text */}
        <h1
          className="font-heading text-6xl sm:text-8xl font-bold text-gold leading-none mb-4"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.1s both' }}
        >
          Eroare
        </h1>

        {/* Title */}
        <h2
          className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}
        >
          Ceva nu a functionat corect
        </h2>

        {/* Description */}
        <p
          className="text-white/70 text-lg mb-8 max-w-xl mx-auto"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}
        >
          Ne pare rau, a aparut o eroare neasteptata. Va rugam incercati din nou
          sau contactati-ne direct.
        </p>

        {/* Gold divider bar */}
        <div
          className="flex justify-center mb-8"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.35s both' }}
        >
          <div
            className="h-[3px] bg-gold rounded-full"
            style={{ animation: 'lineReveal 1s ease-out 0.6s both' }}
          />
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
        >
          {/* Primary: Retry */}
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-semibold px-8 py-3.5 rounded-full hover:bg-gold/90 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(208,156,17,0.4)]"
          >
            <RotateCcw className="w-5 h-5" />
            Incercati din nou
          </button>

          {/* Secondary: Home */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:border-gold/50 hover:bg-white/5 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Inapoi acasa
          </Link>
        </div>

        {/* Divider line */}
        <div
          className="border-t border-white/10 mb-8"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.5s both' }}
        />

        {/* Contact info */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
        >
          <a
            href="mailto:office@stanbaculescu.ro"
            className="inline-flex items-center gap-2 hover:text-gold transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            office@stanbaculescu.ro
          </a>
          <a
            href="tel:+40745466720"
            className="inline-flex items-center gap-2 hover:text-gold transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            +40 745 466 720
          </a>
        </div>
      </div>
    </div>
  );
}
