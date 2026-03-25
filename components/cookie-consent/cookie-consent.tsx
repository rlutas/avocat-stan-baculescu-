'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { X, Settings, Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateConsent } from '@/lib/analytics';

export type CookiePreferences = {
  essential: boolean; // Always true, required
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

// Toggle switch component for cookie preferences
function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        checked ? 'bg-gold' : 'bg-gray-200',
        disabled && 'cursor-not-allowed opacity-60'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

// Helper to get initial preferences from localStorage (client-side only)
function getInitialPreferences(): CookiePreferences {
  if (typeof window === 'undefined') return defaultPreferences;
  const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (savedPrefs) {
    try {
      return JSON.parse(savedPrefs);
    } catch {
      return defaultPreferences;
    }
  }
  return defaultPreferences;
}

export function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(getInitialPreferences);

  // Check if consent has been given on mount and show banner if needed
  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);

    // Update GTM consent state
    updateConsent(prefs.analytics, prefs.marketing);

    // Dispatch custom event so other components can react
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', { detail: prefs })
    );

    // Close with animation
    setIsClosing(true);
    setTimeout(() => {
      setShowBanner(false);
      setIsClosing(false);
      setShowCustomize(false);
    }, 300);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }, [saveConsent]);

  const saveCustomPreferences = useCallback(() => {
    saveConsent(preferences);
  }, [preferences, saveConsent]);

  const togglePreference = useCallback(
    (key: keyof Omit<CookiePreferences, 'essential'>) => {
      setPreferences((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    []
  );

  if (!showBanner) return null;

  return (
    <>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(100px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 6px rgba(208, 156, 17, 0.3);
          }
          50% {
            box-shadow: 0 6px 20px rgba(208, 156, 17, 0.5);
          }
        }
        @keyframes gold-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        .banner-enter {
          animation: slideUp 0.4s ease-out forwards;
        }
        .banner-exit {
          animation: slideDown 0.3s ease-in forwards;
        }
        .backdrop-enter {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .backdrop-exit {
          animation: fadeOut 0.3s ease-in forwards;
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        {/* Backdrop with fade animation */}
        <div
          className={cn(
            'fixed inset-0 bg-navy/60 backdrop-blur-sm',
            isClosing ? 'backdrop-exit' : 'backdrop-enter'
          )}
          aria-hidden="true"
        />

        {/* Banner with slide animation */}
        <div
          className={cn(
            'relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl',
            isClosing ? 'banner-exit' : 'banner-enter'
          )}
        >
          {/* Navy Header */}
          <div className="relative overflow-hidden bg-navy px-4 py-5 sm:px-6">
            {/* Gold decorative elements */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold/10"
              style={{ animation: 'gold-pulse 6s ease-in-out infinite' }}
            />
            <div
              className="pointer-events-none absolute -right-10 top-10 h-20 w-20 rounded-full bg-gold/5"
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 transition-all duration-300 hover:bg-gold/30">
                  <Cookie className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h2
                    id="cookie-consent-title"
                    className="font-heading text-xl font-semibold text-white"
                  >
                    {t('title')}
                  </h2>
                  <p className="text-sm text-white/60">
                    {t('subtitle') || 'Gestioneaza preferintele tale'}
                  </p>
                </div>
              </div>
              <button
                onClick={rejectNonEssential}
                className="rounded-full p-2 text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white"
                aria-label={t('close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {!showCustomize ? (
              // Main banner view
              <>
                <p className="mb-6 text-sm leading-relaxed text-[#4b5563]">
                  {t('description')}{' '}
                  <Link
                    href="/politica-cookies"
                    className="font-medium text-gold underline underline-offset-2 transition-colors hover:text-gold/80"
                  >
                    {t('learnMore')}
                  </Link>
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomize(true)}
                    className="order-3 border-navy text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:order-1"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {t('customize')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={rejectNonEssential}
                    className="order-2 border-navy text-navy transition-all duration-300 hover:bg-navy hover:text-white"
                  >
                    {t('rejectNonEssential')}
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="order-1 bg-gold text-navy shadow-[0_4px_6px_rgba(208,156,17,0.3)] transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_6px_12px_rgba(208,156,17,0.4)] sm:order-3"
                    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
                  >
                    {t('acceptAll')}
                  </Button>
                </div>
              </>
            ) : (
              // Customize view with toggle switches
              <>
                <div className="mb-6 space-y-3">
                  {/* Essential cookies - always on */}
                  <div className="group flex items-center justify-between rounded-xl border border-navy/15 bg-gradient-to-r from-navy/[0.04] to-transparent p-4 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy shadow-sm transition-all duration-300">
                        <Shield className="h-5 w-5 text-gold" />
                        <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-navy">
                          {t('categories.essential.title')}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#6b7280]">
                          {t('categories.essential.description')}
                        </p>
                      </div>
                    </div>
                    <div className="ml-3 flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-gold">
                        {t('alwaysOn')}
                      </span>
                      <ToggleSwitch checked={true} onChange={() => {}} disabled />
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div
                    className={cn(
                      'group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:shadow-md',
                      preferences.analytics
                        ? 'border-gold/30 bg-gradient-to-r from-gold/[0.06] to-transparent'
                        : 'border-gray-200 hover:border-gold/40'
                    )}
                    onClick={() => togglePreference('analytics')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-300',
                        preferences.analytics
                          ? 'bg-gold'
                          : 'bg-[#f0f1f3] group-hover:bg-navy'
                      )}>
                        <BarChart3 className={cn(
                          'h-5 w-5 transition-colors duration-300',
                          preferences.analytics
                            ? 'text-navy'
                            : 'text-[#6b7280] group-hover:text-gold'
                        )} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-navy">
                          {t('categories.analytics.title')}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#6b7280]">
                          {t('categories.analytics.description')}
                        </p>
                      </div>
                    </div>
                    <div className="ml-3 shrink-0">
                      <ToggleSwitch
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                      />
                    </div>
                  </div>

                  {/* Marketing cookies */}
                  <div
                    className={cn(
                      'group flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:shadow-md',
                      preferences.marketing
                        ? 'border-gold/30 bg-gradient-to-r from-gold/[0.06] to-transparent'
                        : 'border-gray-200 hover:border-gold/40'
                    )}
                    onClick={() => togglePreference('marketing')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-300',
                        preferences.marketing
                          ? 'bg-gold'
                          : 'bg-[#f0f1f3] group-hover:bg-navy'
                      )}>
                        <Megaphone className={cn(
                          'h-5 w-5 transition-colors duration-300',
                          preferences.marketing
                            ? 'text-navy'
                            : 'text-[#6b7280] group-hover:text-gold'
                        )} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-navy">
                          {t('categories.marketing.title')}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#6b7280]">
                          {t('categories.marketing.description')}
                        </p>
                      </div>
                    </div>
                    <div className="ml-3 shrink-0">
                      <ToggleSwitch
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomize(false)}
                    className="order-2 border-navy text-navy transition-all duration-300 hover:bg-navy hover:text-white sm:order-1"
                  >
                    {t('back')}
                  </Button>
                  <Button
                    onClick={saveCustomPreferences}
                    className="order-1 bg-gold text-navy shadow-[0_4px_6px_rgba(208,156,17,0.3)] transition-all duration-300 hover:bg-gold/90 hover:shadow-[0_6px_12px_rgba(208,156,17,0.4)] sm:order-2"
                  >
                    {t('savePreferences')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Helper to read cookie preferences from localStorage
// Cache for getStoredPreferences to avoid infinite loops with useSyncExternalStore
let cachedPreferences: CookiePreferences | null = null;
let cachedPreferencesString: string | null = null;

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!hasConsent) {
    cachedPreferences = null;
    cachedPreferencesString = null;
    return null;
  }

  const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);

  // Return cached value if the stored string hasn't changed
  if (savedPrefs === cachedPreferencesString) {
    return cachedPreferences;
  }

  // Update cache and return new parsed value
  cachedPreferencesString = savedPrefs;

  if (savedPrefs) {
    try {
      cachedPreferences = JSON.parse(savedPrefs);
      return cachedPreferences;
    } catch {
      cachedPreferences = defaultPreferences;
      return cachedPreferences;
    }
  }

  cachedPreferences = null;
  return null;
}

// Subscribe function for useSyncExternalStore
function subscribeToCookieConsent(callback: () => void): () => void {
  const handleUpdate = () => callback();
  window.addEventListener('cookieConsentUpdate', handleUpdate);
  return () => window.removeEventListener('cookieConsentUpdate', handleUpdate);
}

// Server snapshot - always return null (no localStorage on server)
function getServerSnapshot(): CookiePreferences | null {
  return null;
}

// Utility hook for other components to check consent
// Uses useSyncExternalStore to avoid setState in useEffect
export function useCookieConsent(): CookiePreferences | null {
  return useSyncExternalStore(
    subscribeToCookieConsent,
    getStoredPreferences,
    getServerSnapshot
  );
}

// Utility to open cookie settings (can be called from footer link)
export function openCookieSettings() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent('openCookieSettings'));
  // Force re-render by triggering storage event
  window.location.reload();
}
