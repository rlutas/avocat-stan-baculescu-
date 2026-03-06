// Google Analytics & GTM type definitions
// Extended by lib/analytics.ts for dataLayer, fbq, ttq
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}
