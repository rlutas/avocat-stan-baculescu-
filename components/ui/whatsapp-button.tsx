'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pushEvent } from '@/lib/analytics';

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_NUMBER = '40745466720'; // Without leading +
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;

// How long after mount to show the button (prevents layout shift clash)
const ENTRANCE_DELAY_MS = 1800;

// How long after entrance to start the idle pulse
const PULSE_START_DELAY_MS = 3200;

// ─── WhatsApp Icon (official path, rendered inline for full control) ──────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// ─── Ripple ring — subtle animated border that breathes ──────────────────────

function PulseRing({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <>
          <motion.span
            key="ring-1"
            className="pointer-events-none absolute inset-0 rounded-full border border-gold/50"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.65 }}
            transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.4 }}
          />
          <motion.span
            key="ring-2"
            className="pointer-events-none absolute inset-0 rounded-full border border-gold/30"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.1 }}
            transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.4, delay: 0.55 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface WhatsAppButtonProps {
  /** Tooltip text shown on hover. Pass translations from parent if needed. */
  tooltipText?: string;
  /** aria-label for the anchor element */
  ariaLabel?: string;
  /** Pre-populated message in the WhatsApp chat window */
  defaultMessage?: string;
  className?: string;
}

export function WhatsAppButton({
  tooltipText = 'Scrie-ne pe WhatsApp',
  ariaLabel = 'Contactați-ne pe WhatsApp',
  defaultMessage = 'Bună ziua, vă contactez de pe site-ul stanbaculescu.ro. Aș dori să programez o consultație juridică. Mulțumesc.',
  className,
}: WhatsAppButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const glowRef = useRef<HTMLAnchorElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  // Mount guard — avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
    const entranceTimer = setTimeout(() => setVisible(true), ENTRANCE_DELAY_MS);
    const pulseTimer = setTimeout(() => setPulseActive(true), PULSE_START_DELAY_MS);
    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  // Stop pulsing while user hovers (less distracting, more elegant)
  useEffect(() => {
    if (isHovered || isFocused) {
      setPulseActive(false);
    } else {
      // Resume after a short grace period so it doesn't snap back immediately
      const t = setTimeout(() => setPulseActive(true), 2000);
      return () => clearTimeout(t);
    }
  }, [isHovered, isFocused]);

  // Cursor-tracking inner glow — mirrors GlowWrapper pattern
  function handleMouseMove(e: React.MouseEvent) {
    if (!glowRef.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleClick() {
    pushEvent('whatsapp_click', {
      click_location: 'floating_button',
      phone_number: `+${PHONE_NUMBER}`,
    });
  }

  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(defaultMessage)}`;

  // Build the tooltip label direction — always left of the button
  const tooltipVisible = isHovered || isFocused;

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            // Fixed positioning — bottom-right, clear of cookie banner and mobile nav
            'fixed bottom-6 right-5 z-40 sm:bottom-8 sm:right-8',
            className
          )}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 22,
            mass: 0.9,
          }}
          // Stop bubbling so tooltip doesn't interfere with page click handlers
          onClick={(e) => e.stopPropagation()}
        >
          {/* Outer container: tooltip + button in a flex row */}
          <div className="flex items-center gap-3">
            {/* ── Tooltip ─────────────────────────────────────────── */}
            <AnimatePresence>
              {tooltipVisible && (
                <motion.div
                  key="tooltip"
                  role="tooltip"
                  id="wa-tooltip"
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                  className={cn(
                    'relative rounded-xl border-l-2 border-gold',
                    'bg-navy px-4 py-2.5 shadow-[0_8px_24px_rgba(0,42,82,0.35)]',
                  )}
                >
                  <p className="text-[13px] font-medium leading-snug text-white/90 whitespace-nowrap">
                    {tooltipText}
                  </p>
                  {/* Arrow pointing right */}
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderLeft: '7px solid #003a70',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Button ──────────────────────────────────────────── */}
            <div className="relative flex items-center justify-center">
              {/* Expanding pulse rings — rendered behind the button */}
              <PulseRing active={pulseActive} />

              {/* The actual anchor */}
              <motion.a
                ref={glowRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                aria-describedby={tooltipVisible ? 'wa-tooltip' : undefined}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                whileTap={{ scale: 0.92 }}
                className={cn(
                  // Base shape — navy circle on mobile, pill on hover
                  'group relative flex items-center justify-center overflow-hidden rounded-full outline-none',
                  // Size: 52px mobile / 56px desktop
                  'h-[52px] w-[52px] sm:h-14 sm:w-14',
                  // Background: deep navy with gold gradient border via box-ring
                  'bg-[#002a52]',
                  // Gold gradient ring — done as ring utility + custom border
                  'ring-1 ring-gold/30',
                  // Elevation
                  'shadow-[0_4px_20px_rgba(0,42,82,0.5),0_0_0_1px_rgba(208,156,17,0.2)]',
                  // Hover elevation and ring
                  'transition-shadow duration-300',
                  'hover:shadow-[0_8px_30px_rgba(0,42,82,0.6),0_0_0_1.5px_rgba(208,156,17,0.5)]',
                  // Focus ring — accessible
                  'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                )}
              >
                {/* Cursor-tracking inner glow (GlowWrapper pattern) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-2xl transition-opacity duration-300"
                  style={{
                    left: glowPos.x,
                    top: glowPos.y,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Gold radial background that intensifies on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(208,156,17,0.12) 0%, transparent 70%)',
                  }}
                />

                {/* WhatsApp icon */}
                <motion.span
                  className="relative z-10 text-white"
                  animate={
                    isHovered
                      ? { scale: 1.12, rotate: -4 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <WhatsAppIcon className="h-6 w-6 sm:h-[26px] sm:w-[26px]" />
                </motion.span>


              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
