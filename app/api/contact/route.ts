import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const RECIPIENT_EMAIL = 'office@stanbaculescu.ro';
const FROM_EMAIL = 'office@stanbaculescu.ro';
const BASE_URL = 'https://stanbaculescu.ro';
const LOGO_URL = `${BASE_URL}/images/logo-email-white.png`;
const AUDIENCE_ID = 'd6085ddf-9f37-480d-b1e5-db5e43c36cf1';

// Firm contact details (single source of truth)
const FIRM = {
  name: 'SCA Stan-Baculescu',
  fullName: 'Stan-Baculescu - Societate Civila de Avocati',
  phone: '+40 745 466 720',
  phoneTel: '+40745466720',
  email: 'office@stanbaculescu.ro',
  address: 'Str. Decebal Nr. 4, Et. 1, Satu Mare 440014',
  hours: 'Non stop',
  facebook: 'https://www.facebook.com/avocati.stanbaculescu',
  instagram: 'https://www.instagram.com/avocati_stanbaculescu',
};

// Rate limiting configuration
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

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

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
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
    ro: 'Drept Administrativ si Fiscal',
    en: 'Administrative and Tax Law',
  },
  other: { ro: 'Altele', en: 'Other' },
};

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

// Shared email styles
const emailColors = {
  navy: '#002a52',
  navyMid: '#003a70',
  navyLight: '#004a8f',
  gold: '#d09c11',
  goldLight: '#e6b520',
  text: '#1f2937',
  textLight: '#6b7280',
  bg: '#f8f9fa',
  white: '#ffffff',
  border: '#e5e7eb',
};

function darkModeHead(): string {
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; }
    @media (prefers-color-scheme: dark) {
      body, .email-body { background-color: #f8f9fa !important; }
      .email-card { background-color: #ffffff !important; }
      .email-text { color: #1f2937 !important; }
      .email-label { color: #003a70 !important; }
      .email-navy-bg { background-color: #002a52 !important; }
    }
  </style>`;
}

function buildNotificationEmail(data: ContactFormData, serviceLabel: string, timestamp: string): string {
  const c = emailColors;
  return `<!DOCTYPE html>
<html lang="ro">
<head>${darkModeHead()}</head>
<body class="email-body" style="margin:0;padding:0;background-color:${c.bg};font-family:Georgia,'Times New Roman',serif;line-height:1.6;color:${c.text};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${c.bg};">
    <tr><td align="center" style="padding:24px 16px;">
      <table class="email-card" role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${c.white};border-radius:8px;overflow:hidden;border:1px solid ${c.border};">

        <!-- Header -->
        <tr><td class="email-navy-bg" style="background-color:${c.navy};padding:24px 28px;text-align:center;">
          <img src="${LOGO_URL}" alt="${FIRM.name}" width="150" height="50" style="display:inline-block;height:auto;max-width:150px;" />
        </td></tr>
        <tr><td style="height:3px;background-color:${c.gold};"></td></tr>

        <!-- Title -->
        <tr><td style="padding:20px 28px;text-align:center;border-bottom:1px solid ${c.border};">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:${c.navy};">Cerere noua de contact</span>
          <br/>
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${c.gold};font-weight:600;">${timestamp}</span>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:24px 28px;">

          <!-- Name -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Nume</td>
            </tr>
            <tr>
              <td class="email-text" style="font-size:16px;font-weight:700;color:${c.navy};padding-bottom:12px;border-bottom:1px solid ${c.border};">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
            </tr>
          </table>

          <!-- Email -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Email</td>
            </tr>
            <tr>
              <td style="padding-bottom:12px;border-bottom:1px solid ${c.border};">
                <a href="mailto:${escapeHtml(data.email)}" style="color:${c.navyMid};text-decoration:none;font-size:15px;">${escapeHtml(data.email)}</a>
              </td>
            </tr>
          </table>

          <!-- Phone -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Telefon</td>
            </tr>
            <tr>
              <td style="padding-bottom:12px;border-bottom:1px solid ${c.border};">
                <a href="tel:${escapeHtml(data.phone)}" style="color:${c.navyMid};text-decoration:none;font-size:15px;">${escapeHtml(data.phone)}</a>
              </td>
            </tr>
          </table>

          <!-- Service -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;padding-bottom:4px;">Domeniu</td>
            </tr>
            <tr>
              <td class="email-text" style="font-size:15px;color:${c.text};padding-bottom:12px;border-bottom:1px solid ${c.border};">${escapeHtml(serviceLabel)}</td>
            </tr>
          </table>

          <!-- Urgency + Contact preference -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td width="50%" valign="top">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;">Urgenta</span><br/>
                <span class="email-text" style="font-size:14px;color:${c.text};font-weight:600;">${data.urgency === 'urgent' ? 'URGENT (24h)' : 'Normal (48h)'}</span>
              </td>
              <td width="50%" valign="top">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;">Contact preferat</span><br/>
                <span class="email-text" style="font-size:14px;color:${c.text};">${data.preferredContact === 'phone' ? 'Telefon' : data.preferredContact === 'email' ? 'Email' : 'WhatsApp'}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;">Mesaj</td>
            </tr>
            <tr>
              <td style="background-color:${c.bg};padding:16px;border-left:3px solid ${c.gold};">
                <span class="email-text" style="font-size:14px;color:${c.text};line-height:1.7;">${escapeHtml(data.message).replace(/\n/g, '<br/>')}</span>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:${c.bg};padding:14px 28px;text-align:center;border-top:1px solid ${c.border};">
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${c.textLight};">Formularul de contact &mdash; <a href="${BASE_URL}" style="color:${c.navyMid};text-decoration:none;font-weight:600;">stanbaculescu.ro</a></span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail(data: ContactFormData, serviceLabel: string, timestamp: string): string {
  const c = emailColors;
  return `<!DOCTYPE html>
<html lang="ro">
<head>${darkModeHead()}</head>
<body class="email-body" style="margin:0;padding:0;background-color:${c.bg};font-family:Georgia,'Times New Roman',serif;line-height:1.6;color:${c.text};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${c.bg};">
    <tr><td align="center" style="padding:24px 16px;">
      <table class="email-card" role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${c.white};border-radius:8px;overflow:hidden;border:1px solid ${c.border};">

        <!-- Header -->
        <tr><td class="email-navy-bg" style="background-color:${c.navy};padding:28px 24px;text-align:center;">
          <img src="${LOGO_URL}" alt="${FIRM.name}" width="160" height="53" style="display:inline-block;height:auto;max-width:160px;" />
        </td></tr>
        <tr><td style="height:3px;background-color:${c.gold};"></td></tr>

        <!-- Content -->
        <tr><td style="padding:28px 24px 20px;">

          <p class="email-text" style="font-size:16px;margin:0 0 16px;color:${c.text};">
            Stimate/Stimata <strong style="color:${c.navy};">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</strong>,
          </p>
          <p class="email-text" style="font-size:15px;margin:0 0 24px;color:${c.text};line-height:1.7;">
            Va multumim pentru mesajul dumneavoastra. Cererea a fost inregistrata cu succes si va fi analizata de echipa noastra de avocati.
          </p>

          <!-- Summary -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background-color:${c.bg};border-left:3px solid ${c.gold};">
            <tr><td style="padding:16px;">
              <span class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;">Rezumat cerere</span>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
                <tr>
                  <td class="email-label" style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${c.navyMid};width:100px;">Domeniu:</td>
                  <td class="email-text" style="padding:4px 0;font-size:13px;color:${c.text};">${escapeHtml(serviceLabel)}</td>
                </tr>
                <tr>
                  <td class="email-label" style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${c.navyMid};">Urgenta:</td>
                  <td class="email-text" style="padding:4px 0;font-size:13px;color:${c.text};">${data.urgency === 'urgent' ? 'Urgent (raspuns in 24h)' : 'Normal (raspuns in 48h)'}</td>
                </tr>
                <tr>
                  <td class="email-label" style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${c.navyMid};">Data:</td>
                  <td class="email-text" style="padding:4px 0;font-size:13px;color:${c.text};">${timestamp}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Next steps -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr><td style="padding:16px;background-color:#faf8f0;border-left:3px solid ${c.gold};">
              <span class="email-label" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:${c.navyMid};text-transform:uppercase;letter-spacing:1px;">Pasii urmatori</span>
              <p class="email-text" style="margin:10px 0 0;font-size:14px;color:${c.text};line-height:1.8;">
                &#8226; Un avocat din echipa noastra va analiza cererea dumneavoastra<br/>
                &#8226; Veti fi contactat/a ${data.urgency === 'urgent' ? 'in maxim 24 de ore' : 'in maxim 48 de ore'} prin ${data.preferredContact === 'phone' ? 'telefon' : data.preferredContact === 'email' ? 'email' : 'WhatsApp'}<br/>
                &#8226; Prima consultatie telefonica este gratuita si fara obligatii
              </p>
            </td></tr>
          </table>

          <p class="email-text" style="font-size:14px;margin:0;color:${c.textLight};line-height:1.6;">
            Daca aveti intrebari urgente, nu ezitati sa ne contactati direct.
          </p>

        </td></tr>

        <!-- Contact bar -->
        <tr><td class="email-navy-bg" style="background-color:${c.navy};padding:20px 24px;text-align:center;">
          <a href="tel:${FIRM.phoneTel}" style="color:${c.goldLight};text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;">${FIRM.phone}</a>
          <br/>
          <a href="mailto:${FIRM.email}" style="color:${c.goldLight};text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;">${FIRM.email}</a>
          <br/>
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.5);line-height:2;">${FIRM.address}</span>
          <br/>
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.4);">${FIRM.hours}</span>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:${c.bg};padding:14px 24px;text-align:center;">
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${c.textLight};">
            Acest email a fost trimis automat.
            &copy; ${new Date().getFullYear()} ${FIRM.name}
          </span>
          <br/>
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;">
            <a href="${FIRM.facebook}" style="color:${c.navyMid};text-decoration:none;">Facebook</a>
            &nbsp;&middot;&nbsp;
            <a href="${FIRM.instagram}" style="color:${c.navyMid};text-decoration:none;">Instagram</a>
            &nbsp;&middot;&nbsp;
            <a href="${BASE_URL}" style="color:${c.navyMid};text-decoration:none;">stanbaculescu.ro</a>
          </span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const serviceLabel =
      serviceLabels[data.subject]?.ro || data.subject || 'Necunoscut';

    const timestamp = new Date().toLocaleString('ro-RO', {
      timeZone: 'Europe/Bucharest',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Build email templates
    const emailHtml = buildNotificationEmail(data, serviceLabel, timestamp);
    const confirmationHtml = buildConfirmationEmail(data, serviceLabel, timestamp);

    const emailText = `Cerere noua de contact - ${timestamp}
======================================

Nume: ${data.firstName} ${data.lastName}
Email: ${data.email}
Telefon: ${data.phone}
Contact preferat: ${data.preferredContact === 'phone' ? 'Telefon' : data.preferredContact === 'email' ? 'Email' : 'WhatsApp'}
Domeniu: ${serviceLabel}
Urgenta: ${data.urgency === 'urgent' ? 'Urgent (24h)' : 'Normal (48h)'}

Mesaj:
${data.message}

---
${FIRM.name} | ${FIRM.address} | ${FIRM.phone}`;

    const confirmationText = `Stimate/Stimata ${data.firstName} ${data.lastName},

Va multumim pentru mesajul dumneavoastra. Cererea a fost inregistrata cu succes.

Domeniu: ${serviceLabel}
Urgenta: ${data.urgency === 'urgent' ? 'Urgent (raspuns in 24h)' : 'Normal (raspuns in 48h)'}
Data: ${timestamp}

Pasii urmatori:
- Un avocat din echipa noastra va analiza cererea dumneavoastra
- Veti fi contactat/a ${data.urgency === 'urgent' ? 'in maxim 24 de ore' : 'in maxim 48 de ore'}
- Prima consultatie telefonica este gratuita si fara obligatii

Contact direct: ${FIRM.phone} | ${FIRM.email}

---
${FIRM.name} | ${FIRM.address}
${FIRM.hours}`;

    // 1. Send notification email to office
    const { error } = await resend.emails.send({
      from: `${FIRM.name} Contact <${FROM_EMAIL}>`,
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

    // 2. Send confirmation email to client (non-blocking)
    try {
      await resend.emails.send({
        from: `${FIRM.name} <${FROM_EMAIL}>`,
        to: [data.email],
        subject: `Confirmare cerere - ${FIRM.name}`,
        html: confirmationHtml,
        text: confirmationText,
      });
    } catch (confirmError) {
      console.error('Confirmation email error:', confirmError);
    }

    // 3. Add contact to Resend audience (non-blocking)
    try {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (audienceError) {
      console.error('Audience add error:', audienceError);
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
