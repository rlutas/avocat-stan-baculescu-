// Google Analytics gtag.js type definitions
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js' | 'set',
    targetIdOrEventName: string | Date,
    params?: GtagEventParams | Record<string, unknown>
  ) => void;
  dataLayer?: unknown[];
}
