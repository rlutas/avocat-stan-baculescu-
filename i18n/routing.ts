import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ro', 'en'],

  // Used when no locale matches - Romanian is the default
  defaultLocale: 'ro',

  // Always show the locale prefix in the URL (/ro/..., /en/...)
  localePrefix: 'always',

  // Disable automatic browser language detection (Accept-Language header)
  // so visitors always land on Romanian by default
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
