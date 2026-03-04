'use client';

import { useTranslations } from 'next-intl';

export function AboutHero() {
  const t = useTranslations('AboutPage.hero');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_60%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle grid texture */}
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

      {/* Gold radial glow — right side */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(208,156,17,0.18) 0%, rgba(208,156,17,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Gold accent top line with shimmer */}
      <div className="absolute left-0 right-0 top-0 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

      {/* Decorative balance scale — centered with glow */}
      <div
        className="pointer-events-none absolute right-[8%] top-[calc(50%-140px)] hidden select-none lg:block"
        style={{ animation: 'scaleFloat 10s ease-in-out infinite' }}
      >
        {/* Gold glow behind */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(208,156,17,0.10) 0%, rgba(208,156,17,0.04) 40%, transparent 70%)',
          }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="280" height="280" style={{ opacity: 0.06, fill: '#d09c11' }}>
          <path d="M62,18.979A2.982,2.982,0,0,0,59.021,16H57a21.09,21.09,0,0,1-10.632-2.492A20.943,20.943,0,0,0,37,11.018V10H35V8.63a4,4,0,1,0-6,0V10H27v1.018a20.943,20.943,0,0,0-9.368,2.49A21.09,21.09,0,0,1,7,16H4.979A2.982,2.982,0,0,0,2,18.979a3.015,3.015,0,0,0,3.045,2.977c.9,0,1.733-.022,2.537-.055L3.313,33H3a1,1,0,0,0-1,1v4a7,7,0,0,0,14,0V34a1,1,0,0,0-1-1h-.313L10.346,21.714a32.317,32.317,0,0,0,11.16-3.01A15.9,15.9,0,0,1,27,17.04V20h2V50H19v4H16a1,1,0,0,0-.948.684l-2,6A1,1,0,0,0,14,62H50a1,1,0,0,0,.948-1.316l-2-6A1,1,0,0,0,48,54H45V50H35V20h2V17.04A15.9,15.9,0,0,1,42.494,18.7a32.317,32.317,0,0,0,11.16,3.01L49.313,33H49a1,1,0,0,0-1,1v4a7,7,0,0,0,14,0V34a1,1,0,0,0-1-1h-.313L56.418,21.9c.8.033,1.64.055,2.537.055A3.015,3.015,0,0,0,62,18.979ZM9,43a5.008,5.008,0,0,1-4.9-4h9.8A5.008,5.008,0,0,1,9,43Zm5-6H4V35H14Zm-1.456-4H5.456L9,23.786ZM27,15.033a17.4,17.4,0,0,0-6.3,1.841c-3.111,1.373-6.984,3.082-15.653,3.082A1,1,0,0,1,4,18.979.979.979,0,0,1,4.979,18H7a23.054,23.054,0,0,0,11.493-2.687A19.012,19.012,0,0,1,27,13.018ZM32,4a2,2,0,0,1,2,2,1.971,1.971,0,0,1-.67,1.479l-.33.3V10H31V7.777l-.33-.3A1.971,1.971,0,0,1,30,6,2,2,0,0,1,32,4ZM47.279,56l1.333,4H15.388l1.333-4ZM43,52v2H21V52ZM31,50V20h2V50Zm4-32H29V12h6ZM55,43a5.008,5.008,0,0,1-4.9-4h9.8A5.008,5.008,0,0,1,55,43Zm5-6H50V35H60Zm-1.456-4H51.456L55,23.786ZM43.3,16.874A17.4,17.4,0,0,0,37,15.033V13.018a19.012,19.012,0,0,1,8.507,2.3A23.054,23.054,0,0,0,57,18h2.021a.979.979,0,0,1,.979.979,1,1,0,0,1-1.045.977C50.286,19.956,46.413,18.247,43.3,16.874Z"/>
          <rect x="31" y="14" width="2" height="2"/>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Gold label */}
          <p
            className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold"
            style={{ animation: 'fadeInUp 0.8s ease-out both' }}
          >
            {t('label')}
          </p>

          {/* Heading */}
          <h1
            className="font-heading font-bold leading-[1.05] text-white"
            style={{ animation: 'fadeInUp 0.8s ease-out 120ms both' }}
          >
            <span className="mb-1 block text-2xl font-semibold text-gold/90 sm:text-3xl">
              {t('titleLine1')}
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl">
              {t('titleLine2')}
            </span>
          </h1>

          {/* Animated gold bar */}
          <div
            className="mt-5 h-[2px] w-16 origin-left bg-gold"
            style={{ animation: 'lineReveal 1.2s ease-out 200ms both' }}
          />

          {/* Description */}
          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
            style={{ animation: 'fadeInUp 0.8s ease-out 280ms both' }}
          >
            {t('subtitle')}
          </p>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes lineReveal {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes scaleFloat {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
      `}</style>
    </section>
  );
}
