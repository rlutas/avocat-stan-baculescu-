declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    ttq: { track: (...args: unknown[]) => void };
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/** Push event to dataLayer for GTM */
export function pushEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

/** Push page context on every navigation */
export function pushPageContext(context: {
  page_type: string;
  language: string;
  practice_area?: string;
  content_group?: string;
}) {
  pushEvent('page_context', context);
}

// ─── LEAD GENERATION ──────────────────────────────────────

export function trackFormSubmission(params: {
  form_name: string;
  service_area?: string;
  language: string;
}) {
  pushEvent('generate_lead', { ...params, value: 1, currency: 'RON' });
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: params.form_name, content_category: params.service_area });
  }
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('SubmitForm', { content_name: params.form_name });
  }
}

export function trackPhoneClick(clickLocation: string, pageType: string) {
  pushEvent('phone_click', { click_location: clickLocation, phone_number: '+40745466720', page_type: pageType });
}

export function trackEmailClick(clickLocation: string) {
  pushEvent('email_click', { click_location: clickLocation, email_address: 'office@stanbaculescu.ro' });
}

export function trackMapsClick(clickLocation: string) {
  pushEvent('maps_click', { click_location: clickLocation, action: 'get_directions' });
}

// ─── ENGAGEMENT ───────────────────────────────────────────

export function trackCtaClick(params: {
  cta_text: string;
  cta_location: string;
  cta_destination: string;
  page_type: string;
}) {
  pushEvent('cta_click', params);
}

export function trackSocialClick(params: {
  social_platform: string;
  click_location: string;
  action: 'profile_visit' | 'share';
}) {
  pushEvent('social_click', params);
}

// ─── BLOG ─────────────────────────────────────────────────

export function trackBlogScrollDepth(params: {
  percent_scrolled: number;
  article_title: string;
  article_slug: string;
}) {
  pushEvent('blog_scroll_depth', params);
}

export function trackArticleRead(params: {
  article_title: string;
  article_slug: string;
  read_time_seconds: number;
  language: string;
}) {
  pushEvent('article_read', params);
}

export function trackBlogShare(params: {
  article_title: string;
  article_slug: string;
  share_platform: string;
}) {
  pushEvent('blog_share', params);
}

// ─── ENHANCED CONVERSIONS ─────────────────────────────────

export function setUserDataForEnhancedConversions(userData: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'set_user_data',
    user_data: {
      email: userData.email?.toLowerCase().trim(),
      phone_number: userData.phone?.replace(/\s/g, ''),
      address: {
        first_name: userData.firstName?.toLowerCase().trim(),
        last_name: userData.lastName?.toLowerCase().trim(),
        country: 'RO',
      },
    },
  });
}

// ─── CONSENT ──────────────────────────────────────────────

export function updateConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
}
