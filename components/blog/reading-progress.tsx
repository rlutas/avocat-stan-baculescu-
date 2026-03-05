'use client';

import { useEffect, useRef, useCallback } from 'react';

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const animate = useCallback(() => {
    // Smoothly interpolate toward target for fluid animation
    currentProgress.current = lerp(
      currentProgress.current,
      targetProgress.current,
      0.15
    );

    // Snap when close enough to avoid endless micro-updates
    if (Math.abs(currentProgress.current - targetProgress.current) < 0.1) {
      currentProgress.current = targetProgress.current;
    }

    if (barRef.current) {
      barRef.current.style.width = `${currentProgress.current}%`;
    }

    // Keep the loop running while there's still a gap
    if (currentProgress.current !== targetProgress.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('.blog-content');
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = articleTop - windowHeight;
      const end = articleTop + articleHeight - windowHeight;
      const current = scrollY - start;
      const total = end - start;

      targetProgress.current =
        Math.min(Math.max(current / total, 0), 1) * 100;

      // Kick off the animation loop if not already running
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={barRef}
      className="fixed top-20 left-0 z-40 h-[3px]"
      style={{
        width: '0%',
        background: 'linear-gradient(90deg, #d09c11, #e6b520)',
        willChange: 'width',
      }}
    />
  );
}
