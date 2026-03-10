'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
}

export function LazyVideo({ src, poster, className = '' }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Observe when container enters viewport — preload video
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Skip video on data saver or slow connections
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.connection?.saveData || nav.connection?.effectiveType === '2g') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay blocked — try with muted
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Poster image — always rendered as base layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Video element — sources injected only when in viewport */}
      {isInView && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isLoaded && isPlaying ? 'opacity-100' : 'opacity-0'}`}
          preload="metadata"
          playsInline
          onCanPlayThrough={() => setIsLoaded(true)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Play button overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={handlePlay}
            className="group absolute inset-0 z-10 flex items-center justify-center bg-navy/30 transition-colors duration-500 hover:bg-navy/40"
            aria-label="Pornește videoul de prezentare"
          >
            {/* Outer ring with pulse */}
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              {/* Pulse ring */}
              <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" style={{ animationDuration: '2s' }} />
              {/* Static ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/40 transition-all duration-500 group-hover:border-gold/70 group-hover:scale-110" />
              {/* Inner circle */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 shadow-[0_0_40px_rgba(208,156,17,0.4)] transition-all duration-500 group-hover:bg-gold group-hover:shadow-[0_0_60px_rgba(208,156,17,0.6)] sm:h-20 sm:w-20">
                {/* Play triangle */}
                <svg className="ml-1 h-7 w-7 text-navy sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
