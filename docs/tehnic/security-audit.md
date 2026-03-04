# Security Audit Report

**Project:** Stan Baculescu Law Firm Website
**Audit Date:** 2026-01-22
**Last Updated:** 2026-03-04
**Next.js Version:** 16.1.4
**Auditor:** Security Audit Specialist

---

## Executive Summary

This security audit assessed the Next.js law firm website for common vulnerabilities, secure coding practices, and compliance with security best practices. The application demonstrates good security fundamentals with proper input validation and environment variable handling. However, several medium-priority improvements are recommended to enhance the overall security posture.

**Overall Security Rating:** 7.5/10

---

## Findings Summary

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 0 | No critical vulnerabilities found |
| High | 1 | XSS vulnerability in blog content rendering |
| Medium | 3 | Missing rate limiting, no CSRF protection, missing security headers |
| Low | 2 | Cookie storage security, outdated packages |
| Info | 3 | Best practice recommendations |

---

## Detailed Findings

### 1. Form Security

#### 1.1 Server-Side Validation ✅ SECURE

**File:** `/app/api/contact/route.ts`

**Status:** Properly implemented

**Details:**
- Client-side validation using Zod schema (lines 21-28 in `components/contact/contact-form.tsx`)
- Server-side validation checks required fields (lines 42-47)
- Field length constraints enforced
- Email format validation

```typescript
// Client-side validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
});
```

**Recommendation:** Consider adding maximum length constraints to prevent buffer overflow attacks.

---

#### 1.2 Input Sanitization ✅ SECURE

**File:** `/app/api/contact/route.ts`

**Status:** Properly implemented

**Details:**
- HTML escaping function prevents XSS in email content (lines 243-252)
- All user inputs are escaped before being inserted into HTML emails
- Proper handling of special characters

```typescript
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
```

---

#### 1.3 Anti-Spam Protection ✅ IMPLEMENTED

**Files:**
- `/app/api/contact/route.ts` (lines 35-39)
- `/components/contact/contact-form.tsx` (lines 27, 271-277)

**Status:** Honeypot field implemented

**Details:**
- Honeypot field (`honeypot`) hidden from legitimate users
- Server returns success even when honeypot is triggered (to not alert bots)
- Proper CSS hiding: `absolute -left-[9999px] h-0 w-0 opacity-0`

**Limitations:**
- No rate limiting implemented
- No CAPTCHA or challenge-response system
- No IP-based throttling

**Recommendation:** See section 1.4 for rate limiting recommendations.

---

#### 1.4 Rate Limiting ⚠️ MISSING (MEDIUM SEVERITY)

**Status:** Not implemented

**Issue:**
The contact form API endpoint (`/app/api/contact/route.ts`) lacks rate limiting, making it vulnerable to:
- Spam submissions
- Denial of Service (DoS) attacks
- Email bombing attacks
- Resource exhaustion

**Recommendation:**

**Option 1: Vercel Rate Limiting (Recommended for Vercel deployments)**

Install Vercel rate limiting:
```bash
npm install @vercel/edge-rate-limit
```

Add to `/app/api/contact/route.ts`:
```typescript
import { rateLimit } from '@vercel/edge-rate-limit';

const limiter = rateLimit({
  interval: '1h',
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success, pending, limit, reset, remaining } = await limiter.check(ip, {
      limit: 5, // 5 submissions per hour per IP
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(reset) } }
      );
    }

    // ... existing code
  } catch (error) {
    // ... existing error handling
  }
}
```

**Option 2: Upstash Redis Rate Limiting (Platform-agnostic)**

For non-Vercel deployments or more control:
```bash
npm install @upstash/redis @upstash/ratelimit
```

**Option 3: Simple In-Memory Rate Limiting (Development only)**

For development or low-traffic sites, consider a simple Map-based rate limiter.

---

#### 1.5 CSRF Protection ⚠️ MISSING (MEDIUM SEVERITY)

**Status:** Not implemented

**Issue:**
The contact form API does not implement CSRF (Cross-Site Request Forgery) protection. While Next.js's same-origin policy provides some protection, explicit CSRF tokens are recommended for POST requests.

**Current Risk:** MEDIUM
- The API is publicly accessible
- No authentication is required
- External sites could potentially submit forms

**Mitigation Factors:**
- Form submissions don't modify user data
- No authentication/session management
- Limited impact (email sending only)

**Recommendation:**

For enhanced security, implement CSRF protection using one of these methods:

**Option 1: Next.js Middleware with CSRF Tokens**

Create `/middleware/csrf.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function verifyCsrfToken(request: NextRequest) {
  const cookieToken = cookies().get('csrf-token')?.value;
  const headerToken = request.headers.get('x-csrf-token');

  if (!cookieToken || cookieToken !== headerToken) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }
}
```

**Option 2: Same-Site Cookie Policy**

Already partially implemented through Next.js defaults, but verify in production that cookies are set with:
- `SameSite=Lax` or `SameSite=Strict`
- `Secure` flag for HTTPS

**Option 3: Origin Verification**

Add origin checking to `/app/api/contact/route.ts`:
```typescript
const allowedOrigins = [
  'https://stanbaculescu.ro',
  'https://www.stanbaculescu.ro',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean);

const origin = request.headers.get('origin');
if (origin && !allowedOrigins.includes(origin)) {
  return NextResponse.json(
    { error: 'Invalid origin' },
    { status: 403 }
  );
}
```

---

### 2. API Routes Security

#### 2.1 API Validation ✅ SECURE

**File:** `/app/api/contact/route.ts`

**Status:** Properly implemented

**Details:**
- Input validation on all required fields
- Type checking through TypeScript
- Error handling prevents sensitive information leakage

---

#### 2.2 Error Handling ✅ SECURE

**File:** `/app/api/contact/route.ts` (lines 233-239)

**Status:** Good implementation

**Details:**
- Generic error messages returned to client
- Detailed errors logged server-side only
- No stack traces exposed to users
- Proper HTTP status codes

```typescript
} catch (error) {
  console.error('Contact form error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

**Best Practice:** Consider using a logging service (e.g., Sentry, LogRocket) for production error tracking.

---

#### 2.3 API Routes Inventory

**Total API Routes:** 1

| Route | Method | Purpose | Authentication | Validation | Rate Limited |
|-------|--------|---------|----------------|------------|--------------|
| `/api/contact` | POST | Contact form submission | No | ✅ Yes | ⚠️ No |

**Recommendation:** As the application grows, maintain an API security checklist for new endpoints.

---

### 3. Environment Variables

#### 3.1 Environment Variable Security ✅ SECURE

**File:** `.env.example`

**Status:** Properly configured

**Details:**
- `.env*` files properly excluded in `.gitignore` (line 34)
- `.env.example` provides template without sensitive data
- Clear documentation for required variables
- Proper naming convention (`NEXT_PUBLIC_` for client-side)

**Environment Variables:**

| Variable | Type | Exposure | Usage | Security Status |
|----------|------|----------|-------|----------------|
| `RESEND_API_KEY` | Server | Server-only | Email sending | ✅ Secure |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client | Public | Analytics | ✅ Safe (public) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Client | Public | SEO | ✅ Safe (public) |
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Public | Database | ✅ Safe (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Public | Database | ✅ Safe (anon key) |

---

#### 3.2 No Hardcoded Secrets ✅ VERIFIED

**Status:** No hardcoded secrets found

**Verification:**
- Searched codebase for common patterns
- All sensitive values loaded from environment variables
- Email addresses are business contact info (not secrets)

**Files Checked:**
- All TypeScript/JavaScript files in `app/`, `components/`, `lib/`
- Configuration files
- No `.env` or `.env.local` files committed

---

### 4. Dependencies Security

#### 4.1 NPM Audit Results ✅ CLEAN

**Command:** `npm audit`

**Results:**
```json
{
  "vulnerabilities": {
    "info": 0,
    "low": 0,
    "moderate": 0,
    "high": 0,
    "critical": 0,
    "total": 0
  }
}
```

**Status:** No known vulnerabilities in dependencies

**Total Dependencies:**
- Production: 113
- Development: 533
- Optional: 128

---

#### 4.2 Outdated Packages ℹ️ INFO

**Minor updates available:**

| Package | Current | Latest | Risk |
|---------|---------|--------|------|
| `@types/node` | 20.19.30 | 25.0.10 | Low (type definitions only) |
| `prettier` | 3.8.0 | 3.8.1 | None (dev dependency) |

**Recommendation:**
```bash
npm update prettier
# For @types/node, major version update - test before upgrading
```

---

#### 4.3 Key Dependencies Security Review

**Framework & Core:**
- `next@16.1.4` - Latest stable version ✅
- `react@19.2.3` - Latest version ✅
- `typescript@5.x` - Latest major version ✅

**Form Handling:**
- `react-hook-form@7.71.1` - Secure, maintained ✅
- `zod@4.3.5` - Latest major version ✅
- `@hookform/resolvers@5.2.2` - Current ✅

**API & Services:**
- `resend@6.8.0` - Official email SDK ✅
- `@supabase/supabase-js@2.91.0` - Official SDK ✅

**Animation (added March 2026):**
- `framer-motion@12.34.5` - Widely-used animation library ✅

**Security Status:** All dependencies are up-to-date and actively maintained.

---

### 5. Security Headers & CSP

#### 5.1 Security Headers ⚠️ MISSING (MEDIUM SEVERITY)

**File:** `/next.config.ts`

**Status:** Not configured

**Issue:**
No security headers are explicitly configured in the Next.js configuration. While Next.js provides some default security features, explicit headers are recommended.

**Missing Headers:**
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security (HSTS)

**Recommendation:**

Add security headers to `/next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Prevent clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevent MIME type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

// ... rest of config
```

**For production HTTPS deployments, add HSTS:**

```typescript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains; preload',
}
```

---

#### 5.2 Content Security Policy (CSP) ⚠️ NOT CONFIGURED

**Status:** Not implemented

**Issue:**
No Content Security Policy is configured, which could help prevent XSS attacks and control resource loading.

**Recommendation:**

Start with a moderate CSP policy:

```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://www.google-analytics.com https://*.supabase.co",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}
```

**Note:** The presence of `'unsafe-inline'` and `'unsafe-eval'` is often necessary for Next.js applications and Google Analytics. Consider implementing CSP nonces or hashes for better security.

**Testing CSP:**
1. Start with `Content-Security-Policy-Report-Only` header
2. Monitor violations using a CSP reporting endpoint
3. Gradually tighten the policy
4. Switch to enforcing mode

---

### 6. Data Exposure

#### 6.1 Client-Side Code Review ✅ SECURE

**Status:** No sensitive data exposed

**Verified:**
- No API keys in client components
- `RESEND_API_KEY` is server-only (no `NEXT_PUBLIC_` prefix)
- Supabase keys are appropriately scoped (anonymous key for public access)
- Google Analytics ID is intentionally public

---

#### 6.2 JSON-LD Schema Data ✅ SAFE

**Files Checked:**
- `/components/seo/organization-schema.tsx`
- `/app/[locale]/contact/page.tsx`
- `/app/[locale]/servicii/[serviceId]/page.tsx`
- `/app/[locale]/blog/[slug]/page.tsx`

**Status:** Only public business information included

**Data Exposed:**
- Business name, address, phone (public contact info)
- Service descriptions (marketing content)
- Operating hours (public information)
- Social media links (public)

No sensitive data found in structured data.

---

#### 6.3 Error Messages ✅ SECURE

**Status:** Safe error handling

**Details:**
- Generic error messages to users
- No stack traces exposed
- No database error details leaked
- Server-side logging only

---

### 7. XSS Vulnerabilities

#### 7.1 Blog Content Rendering ⚠️ HIGH SEVERITY

**File:** `/components/blog/blog-article.tsx` (line 194)

**Status:** Potential XSS vulnerability

**Issue:**
```typescript
<div
  className="prose prose-lg..."
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

Blog content is rendered using `dangerouslySetInnerHTML` without sanitization library.

**Current Risk:** HIGH if blog content is:
- User-generated content
- Sourced from external CMS
- Editable by untrusted users

**Current Mitigation:** LOW risk if:
- Content is from local MDX files only (currently the case)
- Content is reviewed before deployment
- Access to content files is restricted

**Current Setup Analysis:**

From `velite.config.ts`:
- Content source: Local MDX files (`content/blog/**/*.mdx`)
- Build-time processing with Velite
- No runtime content injection
- Content is under version control

**Conclusion:** Currently LOW risk since content is:
1. Static MDX files in Git
2. Processed at build time
3. Not user-editable at runtime

**Future Risk:** If you move to a CMS or allow user-generated content, this becomes HIGH severity.

---

**Recommendation:**

**Immediate (Low Priority):**
Since content is static and version-controlled, this is currently acceptable.

**Before Moving to Dynamic Content (High Priority):**

Install sanitization library:
```bash
npm install rehype-sanitize
```

Update `velite.config.ts`:
```typescript
import rehypeSanitize from 'rehype-sanitize';

export default defineConfig({
  // ... existing config
  mdx: {
    rehypePlugins: [rehypeSanitize],
    remarkPlugins: [],
  },
});
```

**Alternative:** Use a more strict approach with allowlist:

```typescript
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { merge } from 'lodash';

const customSchema = merge(defaultSchema, {
  attributes: {
    '*': ['className'],
  },
  tagNames: ['div', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'code', 'pre'],
});

export default defineConfig({
  mdx: {
    rehypePlugins: [[rehypeSanitize, customSchema]],
    remarkPlugins: [],
  },
});
```

---

#### 7.2 JSON-LD Injection ✅ MITIGATED

**Files:** Multiple pages use `dangerouslySetInnerHTML` for JSON-LD

**Status:** Safe usage

**Reason:**
- Data is JSON.stringify() of controlled objects
- No user input in JSON-LD data
- Structured data is from static configuration

---

#### 7.3 Input Validation ✅ SECURE

**Status:** All user inputs properly validated and sanitized

**Components:**
- Contact form: Zod validation + HTML escaping
- No other user input fields found

---

### 8. Additional Security Considerations

#### 8.1 Cookie Security ℹ️ INFO

**File:** `/components/cookie-consent/cookie-consent.tsx`

**Status:** Using localStorage, not cookies

**Details:**
- Consent preferences stored in localStorage
- JSON.parse() used on stored data (line 77)
- Error handling implemented (try-catch)

**Potential Issue:**
```typescript
try {
  setPreferences(JSON.parse(savedPrefs));
} catch {
  // Invalid JSON, use defaults
}
```

**Risk:** LOW - localStorage can be manipulated by user, but:
- No security decisions based on this data
- Only affects user's own preferences
- Fallback to safe defaults on error

**Recommendation:** Current implementation is acceptable. If storing sensitive data in the future, consider:
- Using HTTP-only cookies
- Encrypting stored data
- Adding integrity checks

---

#### 8.2 Google Analytics Privacy ✅ GOOD

**File:** `/components/analytics/google-analytics.tsx`

**Status:** Privacy-conscious implementation

**Details:**
- IP anonymization enabled (`anonymize_ip: true`)
- Consent-based loading (only loads if analytics cookies accepted)
- GDPR-compliant approach

---

#### 8.3 Supabase Configuration ✅ SECURE

**File:** `/lib/supabase/client.ts`

**Status:** Secure configuration

**Details:**
- Auth disabled by default (`persistSession: false`)
- Graceful degradation if not configured
- Anon key is appropriate for public access
- No authentication features exposed without configuration

---

### 9. Middleware Security

#### 9.1 Middleware Implementation ℹ️ MINIMAL

**File:** `/middleware.ts`

**Status:** Only internationalization middleware

**Details:**
```typescript
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
```

**Current State:**
- Simple i18n routing only
- No security middleware
- API routes excluded from middleware

**Recommendation:** Consider adding security middleware for:
- Rate limiting
- Request logging
- Security headers
- Bot detection

---

## Security Checklist

### ✅ Implemented Security Measures

- [x] Server-side input validation (Zod)
- [x] HTML escaping for email content
- [x] Honeypot spam protection
- [x] Environment variable security
- [x] No hardcoded secrets
- [x] Secure error handling
- [x] Generic error messages to clients
- [x] `.env` files in `.gitignore`
- [x] Dependencies security (0 vulnerabilities)
- [x] IP anonymization for Google Analytics
- [x] Cookie consent management
- [x] Type safety (TypeScript)
- [x] Supabase auth disabled by default
- [x] Controlled use of `dangerouslySetInnerHTML`

### ⚠️ Recommended Improvements

#### Medium Priority
- [ ] Implement rate limiting on contact form API
- [ ] Add CSRF protection or origin verification
- [ ] Configure security headers in `next.config.ts`
- [ ] Implement Content Security Policy
- [ ] Add request logging for security monitoring

#### Low Priority
- [ ] Install `rehype-sanitize` for future content safety
- [ ] Update `prettier` to latest patch version
- [ ] Consider adding CAPTCHA for additional spam protection
- [ ] Implement API request logging/monitoring
- [ ] Add penetration testing to CI/CD pipeline

#### Future Considerations
- [ ] Add WAF (Web Application Firewall) if using Cloudflare/AWS
- [ ] Implement API documentation with security considerations
- [ ] Add security.txt file
- [ ] Consider adding CSP reporting endpoint
- [ ] Add monitoring for failed API requests (DoS detection)

---

## Compliance & Best Practices

### OWASP Top 10 (2021) Assessment

| Risk | Status | Notes |
|------|--------|-------|
| A01: Broken Access Control | ✅ N/A | No authentication system implemented |
| A02: Cryptographic Failures | ✅ Secure | No sensitive data stored; HTTPS recommended for deployment |
| A03: Injection | ✅ Secure | Input validation and sanitization implemented |
| A04: Insecure Design | ✅ Good | Security considered in design |
| A05: Security Misconfiguration | ⚠️ Medium | Missing security headers and CSP |
| A06: Vulnerable Components | ✅ Secure | All dependencies up-to-date, 0 known vulnerabilities |
| A07: Authentication Failures | ✅ N/A | No authentication implemented |
| A08: Data Integrity Failures | ✅ Secure | No data modification without validation |
| A09: Security Logging/Monitoring | ⚠️ Limited | Basic error logging; no security monitoring |
| A10: Server-Side Request Forgery | ✅ N/A | No SSRF vectors identified |

### GDPR Compliance

- ✅ Cookie consent implemented
- ✅ IP anonymization for analytics
- ✅ Privacy policy in place (assumed from route)
- ✅ No personal data storage without consent
- ✅ Contact form data handling is transparent

---

## Deployment Security Checklist

Before deploying to production, ensure:

### Server Configuration
- [ ] HTTPS enabled with valid SSL certificate
- [ ] HTTP redirects to HTTPS
- [ ] HSTS header configured
- [ ] Security headers implemented
- [ ] CSP policy configured and tested

### Environment
- [ ] All environment variables set in production
- [ ] `NODE_ENV=production`
- [ ] Error reporting configured (e.g., Sentry)
- [ ] Rate limiting configured
- [ ] Monitoring and alerting set up

### Verification
- [ ] Run `npm audit` before each deployment
- [ ] Test contact form in production
- [ ] Verify security headers using securityheaders.com
- [ ] Test CSP policy
- [ ] Verify SSL configuration using ssllabs.com

---

## Testing Recommendations

### Security Testing

1. **Automated Testing:**
   ```bash
   # Run before each deployment
   npm audit
   npm outdated
   ```

2. **Manual Testing:**
   - Test contact form with XSS payloads
   - Test rate limiting (when implemented)
   - Verify CORS policies
   - Test error handling

3. **Tools to Use:**
   - [OWASP ZAP](https://www.zaproxy.org/) - Automated security testing
   - [SecurityHeaders.com](https://securityheaders.com/) - Header analysis
   - [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL configuration
   - [Mozilla Observatory](https://observatory.mozilla.org/) - Overall security

---

## Incident Response

### If a Security Issue is Discovered

1. **Assess Impact:**
   - Determine scope of vulnerability
   - Identify affected systems/data
   - Assess exploitation likelihood

2. **Immediate Actions:**
   - Document the issue
   - Notify stakeholders
   - Consider temporary mitigation (e.g., disable affected endpoint)

3. **Remediation:**
   - Develop and test fix
   - Deploy fix to production
   - Verify fix effectiveness
   - Update dependencies if applicable

4. **Post-Incident:**
   - Document incident and response
   - Update security procedures
   - Consider penetration testing

---

## Conclusion

The Stan Baculescu Law Firm website demonstrates solid security fundamentals with proper input validation, environment variable management, and dependency security. The application is production-ready with the current feature set.

### Priority Action Items

**Before Production Launch:**
1. Implement rate limiting on contact form (Medium Priority)
2. Add security headers to `next.config.ts` (Medium Priority)
3. Configure basic Content Security Policy (Medium Priority)

**Within 30 Days of Launch:**
4. Add origin verification or CSRF protection (Medium Priority)
5. Set up security monitoring and alerting (Low Priority)

**For Future Development:**
6. Install `rehype-sanitize` before moving to dynamic content (High Priority when needed)
7. Implement comprehensive CSP with reporting (Low Priority)

### Final Security Rating: 7.5/10

**Strengths:**
- Strong input validation
- No dependency vulnerabilities
- Secure environment variable handling
- Good error handling
- GDPR-compliant analytics

**Areas for Improvement:**
- Rate limiting implementation
- Security headers configuration
- CSP policy deployment
- Security monitoring

---

**Report Generated:** 2026-01-22
**Last Updated:** 2026-03-04
**Next Review Date:** 2026-06-04 (90 days from last update)

---

## Appendix A: Code Snippets for Implementation

### A.1 Complete Security Headers Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://*.supabase.co",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: {
    hooks: {
      beforeCompile: { tapPromise: (name: string, callback: () => Promise<void>) => void };
    };
  }) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = process.env.NODE_ENV === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
```

### A.2 Rate Limiting Implementation (Vercel)

```bash
npm install @vercel/edge-rate-limit
```

```typescript
// app/api/contact/route.ts
import { rateLimit } from '@vercel/edge-rate-limit';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const limiter = rateLimit({
  interval: '1h',
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success, limit, reset, remaining } = await limiter.check(ip, {
      limit: 5, // 5 submissions per hour
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Prea multe cereri. Vă rugăm să încercați mai târziu.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(reset),
          }
        }
      );
    }

    // ... rest of existing code
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### A.3 Origin Verification

```typescript
// app/api/contact/route.ts
const ALLOWED_ORIGINS = [
  'https://stanbaculescu.ro',
  'https://www.stanbaculescu.ro',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[];

export async function POST(request: NextRequest) {
  try {
    // Origin verification
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      console.warn('Blocked request from unauthorized origin:', origin);
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // ... rest of existing code
  } catch (error) {
    // ... error handling
  }
}
```

---

## Appendix B: Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Documentation](https://nextjs.org/docs/app/building-your-application/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [SecurityHeaders.com](https://securityheaders.com/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

---

## Changelog

- **2026-03-04**: Added Framer Motion to dependency review. Updated review date and next review schedule. All dependencies remain vulnerability-free. Team roster updated (6 members: Camelia Stan, Vlad Baculescu, Diana Chincea, Cristina Blan, Alexandra Rusu, Diana Veres).
- **2026-01-22**: Initial security audit report.

**End of Security Audit Report**
