import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const RECIPIENT_EMAIL = 'office@stanbaculescu.ro';
const FROM_EMAIL = 'contact@stanbaculescu.ro'; // Must be verified in Resend

// Rate limiting configuration
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

/**
 * Check if the IP is within rate limits
 * @param ip - The IP address to check
 * @returns true if request is allowed, false if rate limited
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  // Clean up old entries periodically (basic memory management)
  if (rateLimit.size > 10000) {
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Get client IP from request headers
 * @param request - The incoming request
 * @returns The client IP address or 'unknown'
 */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  subject: string;
  urgency: 'normal' | 'urgent';
  message: string;
  gdprConsent: boolean;
  honeypot?: string;
}

const serviceLabels: Record<string, { ro: string; en: string }> = {
  'malpraxis-medical': { ro: 'Malpraxis Medical', en: 'Medical Malpractice' },
  'drept-civil': { ro: 'Drept Civil', en: 'Civil Law' },
  'drept-penal': { ro: 'Drept Penal', en: 'Criminal Law' },
  'drept-familiei': { ro: 'Dreptul Familiei', en: 'Family Law' },
  'dreptul-muncii': { ro: 'Dreptul Muncii', en: 'Labor Law' },
  'drept-comercial': { ro: 'Drept Comercial', en: 'Commercial Law' },
  'accidente-rutiere': { ro: 'Accidente Rutiere', en: 'Traffic Accidents' },
  'drept-administrativ-fiscal': {
    ro: 'Drept Administrativ și Fiscal',
    en: 'Administrative and Tax Law',
  },
  other: { ro: 'Altele', en: 'Other' },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();

    // Honeypot check - if filled, it's a bot
    if (data.honeypot) {
      // Return success to not alert the bot
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get service label
    const serviceLabel =
      serviceLabels[data.subject]?.ro || data.subject || 'Necunoscut';

    // Format timestamp
    const timestamp = new Date().toLocaleString('ro-RO', {
      timeZone: 'Europe/Bucharest',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #002a52 0%, #003a70 50%, #004a8f 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f3f4f6;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: 600;
      color: #003a70;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .value {
      color: #1f2937;
      font-size: 16px;
    }
    .message-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #d09c11;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
    .timestamp {
      background: #fef9e7;
      color: #92400e;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-block;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Cerere noua de contact</h1>
    <span class="timestamp">${timestamp}</span>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Nume</div>
      <div class="value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
    </div>
    <div class="field">
      <div class="label">Telefon</div>
      <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
    </div>
    <div class="field">
      <div class="label">Metoda preferata de contact</div>
      <div class="value">${escapeHtml(data.preferredContact === 'phone' ? 'Telefon' : data.preferredContact === 'email' ? 'Email' : 'WhatsApp')}</div>
    </div>
    <div class="field">
      <div class="label">Domeniu de interes</div>
      <div class="value">${escapeHtml(serviceLabel)}</div>
    </div>
    <div class="field">
      <div class="label">Urgenta</div>
      <div class="value">${data.urgency === 'urgent' ? '🔴 Urgent (24h)' : 'Normal (48h)'}</div>
    </div>
    <div class="field">
      <div class="label">Mesaj</div>
      <div class="message-box">
        <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
  <div class="footer">
    Acest email a fost trimis prin formularul de contact de pe site-ul Stan Baculescu.
  </div>
</body>
</html>
`;

    // Create plain text version
    const emailText = `
Cerere noua de contact - ${timestamp}
======================================

Nume: ${data.firstName} ${data.lastName}
Email: ${data.email}
Telefon: ${data.phone}
Metoda preferata de contact: ${data.preferredContact === 'phone' ? 'Telefon' : data.preferredContact === 'email' ? 'Email' : 'WhatsApp'}
Domeniu de interes: ${serviceLabel}
Urgenta: ${data.urgency === 'urgent' ? 'Urgent (24h)' : 'Normal (48h)'}

Mesaj:
${data.message}

---
Acest email a fost trimis prin formularul de contact de pe site-ul Stan Baculescu.
`;

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: `Stan Baculescu Contact <${FROM_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: data.email,
      subject: `[Contact] ${serviceLabel} - ${data.firstName} ${data.lastName}${data.urgency === 'urgent' ? ' [URGENT]' : ''}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
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
