'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { X, Settings, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  // Check if consent has been given on mount
  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch {
          // Invalid JSON, use defaults
        }
      }
    }
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowCustomize(false);

    // Dispatch custom event so other components can react
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdate', { detail: prefs })
    );
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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Banner */}
      <div className="relative z-10 w-full max-w-2xl rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef9e7]">
              <Cookie className="h-5 w-5 text-gold" />
            </div>
            <h2
              id="cookie-consent-title"
              className="text-lg font-semibold text-navy"
            >
              {t('title')}
            </h2>
          </div>
          <button
            onClick={rejectNonEssential}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-navy"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {!showCustomize ? (
            // Main banner view
            <>
              <p className="mb-6 text-sm leading-relaxed text-[#4b5563]">
                {t('description')}{' '}
                <a
                  href="/politica-cookies"
                  className="font-medium text-gold underline underline-offset-2 hover:text-gold/80"
                >
                  {t('learnMore')}
                </a>
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(true)}
                  className="order-3 border-navy text-navy hover:bg-navy/5 sm:order-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t('customize')}
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectNonEssential}
                  className="order-2 border-navy text-navy hover:bg-navy/5"
                >
                  {t('rejectNonEssential')}
                </Button>
                <Button
                  onClick={acceptAll}
                  className="order-1 bg-gold text-navy hover:bg-gold/90 shadow-[0_4px_6px_rgba(208,156,17,0.2)] sm:order-3"
                >
                  {t('acceptAll')}
                </Button>
              </div>
            </>
          ) : (
            // Customize view
            <>
              <div className="mb-6 space-y-4">
                {/* Essential cookies - always on */}
                <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-navy">
                      {t('categories.essential.title')}
                    </h3>
                    <p className="mt-1 text-sm text-[#4b5563]">
                      {t('categories.essential.description')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-400">
                      {t('alwaysOn')}
                    </span>
                  </div>
                </div>

                {/* Analytics cookies */}
                <label className="flex cursor-pointer items-start justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-gold hover:bg-[#fef9e7]/50">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-navy">
                      {t('categories.analytics.title')}
                    </h3>
                    <p className="mt-1 text-sm text-[#4b5563]">
                      {t('categories.analytics.description')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="h-5 w-5 cursor-pointer rounded border-gray-300 text-gold accent-gold focus:ring-gold"
                    />
                  </div>
                </label>

                {/* Marketing cookies */}
                <label className="flex cursor-pointer items-start justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-gold hover:bg-[#fef9e7]/50">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-navy">
                      {t('categories.marketing.title')}
                    </h3>
                    <p className="mt-1 text-sm text-[#4b5563]">
                      {t('categories.marketing.description')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference('marketing')}
                      className="h-5 w-5 cursor-pointer rounded border-gray-300 text-gold accent-gold focus:ring-gold"
                    />
                  </div>
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomize(false)}
                  className="order-2 border-navy text-navy hover:bg-navy/5 sm:order-1"
                >
                  {t('back')}
                </Button>
                <Button
                  onClick={saveCustomPreferences}
                  className="order-1 bg-gold text-navy hover:bg-gold/90 shadow-[0_4px_6px_rgba(208,156,17,0.2)] sm:order-2"
                >
                  {t('savePreferences')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Utility hook for other components to check consent
export function useCookieConsent(): CookiePreferences | null {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null
  );

  useEffect(() => {
    // Initial load
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (hasConsent) {
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch {
          setPreferences(defaultPreferences);
        }
      }
    }

    // Listen for updates
    const handleUpdate = (event: CustomEvent<CookiePreferences>) => {
      setPreferences(event.detail);
    };

    window.addEventListener(
      'cookieConsentUpdate',
      handleUpdate as EventListener
    );
    return () => {
      window.removeEventListener(
        'cookieConsentUpdate',
        handleUpdate as EventListener
      );
    };
  }, []);

  return preferences;
}

// Utility to open cookie settings (can be called from footer link)
export function openCookieSettings() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent('openCookieSettings'));
  // Force re-render by triggering storage event
  window.location.reload();
}
