'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowWrapper({ children, className }: GlowWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative overflow-hidden', className)}
    >
      <span
        className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-xl transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </div>
  );
}
