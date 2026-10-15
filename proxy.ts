import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  // next-intl adds the missing locale prefix with a temporary 307 redirect
  // (e.g. `/` -> `/ro`). Locale detection is off, so the target never changes:
  // make it permanent so Google moves the old URL's ranking to the prefixed one.
  const location = response.headers.get('location');
  if (response.status === 307 && location) {
    return NextResponse.redirect(new URL(location, request.url), 308);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
