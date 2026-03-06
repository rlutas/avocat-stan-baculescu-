import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const RECIPIENT_EMAIL = 'office@stanbaculescu.ro';
const FROM_EMAIL = 'contact@stanbaculescu.ro';
const BASE_URL = 'https://stanbaculescu.ro';
const LOGO_URL = `${BASE_URL}/images/logo.webp`;
const AUDIENCE_ID = 'd6085ddf-9f37-480d-b1e5-db5e43c36cf1';

// Firm contact details (single source of truth)
const FIRM = {
  name: 'SCA Stan-Baculescu',
  fullName: 'Stan-Baculescu - Societate Civila de Avocati',
  phone: '+40 745 466 720',
  phoneTel: '+40745466720',
  email: 'office@stanbaculescu.ro',
  address: 'Str. Decebal Nr. 4, Et. 1, Satu Mare 440014',
  hours: 'Luni - Vineri: 09:00 - 17:00',
  facebook: 'https://www.facebook.com/cabinetavocaturastanbaculescu',
  instagram: 'https://www.instagram.com/cabinet_stan_baculescu/',
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

function buildNotificationEmail(data: ContactFormData, serviceLabel: string, timestamp: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:${emailColors.bg};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:${emailColors.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailColors.bg};">
    <tr><td align="center" style="padding:30px 20px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${emailColors.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,42,82,0.08);">

        <!-- Header with logo -->
        <tr><td style="background:linear-gradient(135deg,${emailColors.navy} 0%,${emailColors.navyMid} 50%,${emailColors.navyLight} 100%);padding:28px 30px;text-align:center;">
          <img src="${LOGO_URL}" alt="${FIRM.name}" width="160" height="53" style="display:inline-block;height:auto;max-width:160px;filter:brightness(0) invert(1);" />
        </td></tr>

        <!-- Gold accent line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,${emailColors.gold},${emailColors.goldLight},${emailColors.gold});"></td></tr>

        <!-- Title bar -->
        <tr><td style="background:${emailColors.navy};padding:16px 30px;text-align:center;">
          <span style="color:${emailColors.white};font-size:18px;font-weight:600;">Cerere noua de contact</span>
          <br/>
          <span style="display:inline-block;margin-top:8px;background:rgba(208,156,17,0.15);color:${emailColors.goldLight};padding:5px 14px;border-radius:20px;font-size:12px;font-weight:500;">${timestamp}</span>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:30px;">

          <!-- Client name -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-bottom:1px solid ${emailColors.border};padding-bottom:16px;">
            <tr>
              <td style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;padding-bottom:4px;">Nume complet</td>
            </tr>
            <tr>
              <td style="font-size:17px;font-weight:600;color:${emailColors.navy};">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
            </tr>
          </table>

          <!-- Contact details row -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-bottom:1px solid ${emailColors.border};padding-bottom:16px;">
            <tr>
              <td width="50%" valign="top" style="padding-right:10px;">
                <span style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;">Email</span><br/>
                <a href="mailto:${escapeHtml(data.email)}" style="color:${emailColors.navyMid};text-decoration:none;font-size:15px;">${escapeHtml(data.email)}</a>
              </td>
              <td width="50%" valign="top" style="padding-left:10px;">
                <span style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;">Telefon</span><br/>
                <a href="tel:${escapeHtml(data.phone)}" style="color:${emailColors.navyMid};text-decoration:none;font-size:15px;">${escapeHtml(data.phone)}</a>
              </td>
            </tr>
          </table>

          <!-- Service + Urgency + Contact method -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-bottom:1px solid ${emailColors.border};padding-bottom:16px;">
            <tr>
              <td width="33%" valign="top">
                <span style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;">Domeniu</span><br/>
                <span style="font-size:14px;color:${emailColors.text};">${escapeHtml(serviceLabel)}</span>
              </td>
              <td width="33%" valign="top">
                <span style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;">Urgenta</span><br/>
                <span style="display:inline-block;margin-top:2px;padding:2px 10px;border-radius:12px;font-size:13px;font-weight:600;${data.urgency === 'urgent' ? `background:#fef2f2;color:#dc2626;` : `background:${emailColors.bg};color:${emailColors.textLight};`}">${data.urgency === 'urgent' ? 'URGENT (24h)' : 'Normal (48h)'}</span>
              </td>
              <td width="33%" valign="top">
                <span style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;">Contact preferat</span><br/>
                <span style="font-size:14px;color:${emailColors.text};">${data.preferredContact === 'phone' ? 'Telefon' : data.preferredContact === 'email' ? 'Email' : 'WhatsApp'}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.8px;padding-bottom:8px;">Mesaj</td>
            </tr>
            <tr>
              <td style="background:${emailColors.bg};padding:20px;border-radius:8px;border-left:4px solid ${emailColors.gold};">
                <span style="font-size:15px;color:${emailColors.text};line-height:1.7;">${escapeHtml(data.message).replace(/\n/g, '<br/>')}</span>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${emailColors.bg};padding:16px 30px;text-align:center;border-top:1px solid ${emailColors.border};">
          <span style="font-size:12px;color:${emailColors.textLight};">Trimis prin formularul de contact de pe <a href="${BASE_URL}" style="color:${emailColors.navyMid};text-decoration:none;font-weight:600;">stanbaculescu.ro</a></span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail(data: ContactFormData, serviceLabel: string, timestamp: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:${emailColors.bg};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:${emailColors.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailColors.bg};">
    <tr><td align="center" style="padding:30px 20px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${emailColors.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,42,82,0.08);">

        <!-- Header with logo -->
        <tr><td style="background:linear-gradient(135deg,${emailColors.navy} 0%,${emailColors.navyMid} 50%,${emailColors.navyLight} 100%);padding:32px 30px;text-align:center;">
          <img src="${LOGO_URL}" alt="${FIRM.name}" width="180" height="60" style="display:inline-block;height:auto;max-width:180px;filter:brightness(0) invert(1);" />
          <br/>
          <span style="display:inline-block;margin-top:8px;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:0.5px;">${FIRM.fullName}</span>
        </td></tr>

        <!-- Gold accent line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,${emailColors.gold},${emailColors.goldLight},${emailColors.gold});"></td></tr>

        <!-- Content -->
        <tr><td style="padding:35px 30px 25px;">

          <!-- Greeting -->
          <p style="font-size:16px;margin:0 0 20px;color:${emailColors.text};">
            Stimate/Stimata <strong>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</strong>,
          </p>
          <p style="font-size:15px;margin:0 0 24px;color:${emailColors.text};line-height:1.7;">
            Va multumim pentru mesajul dumneavoastra. Cererea a fost inregistrata cu succes si va fi analizata de echipa noastra de avocati.
          </p>

          <!-- Summary box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:${emailColors.bg};border-radius:8px;border-left:4px solid ${emailColors.gold};overflow:hidden;">
            <tr><td style="padding:20px;">
              <span style="font-size:13px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.5px;">Rezumat cerere</span>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td style="padding:5px 0;font-size:14px;font-weight:600;color:${emailColors.navyMid};width:120px;">Domeniu:</td>
                  <td style="padding:5px 0;font-size:14px;color:${emailColors.text};">${escapeHtml(serviceLabel)}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;font-size:14px;font-weight:600;color:${emailColors.navyMid};">Urgenta:</td>
                  <td style="padding:5px 0;font-size:14px;color:${emailColors.text};">${data.urgency === 'urgent' ? 'Urgent (raspuns in 24h)' : 'Normal (raspuns in 48h)'}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;font-size:14px;font-weight:600;color:${emailColors.navyMid};">Data:</td>
                  <td style="padding:5px 0;font-size:14px;color:${emailColors.text};">${timestamp}</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Next steps -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#fef9e7;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:20px;">
              <span style="font-size:13px;font-weight:700;color:${emailColors.navyMid};text-transform:uppercase;letter-spacing:0.5px;">Pasii urmatori</span>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:${emailColors.text};line-height:1.6;">
                    &#9670; Un avocat din echipa noastra va analiza cererea dumneavoastra
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:${emailColors.text};line-height:1.6;">
                    &#9670; Veti fi contactat/a ${data.urgency === 'urgent' ? 'in maxim 24 de ore' : 'in maxim 48 de ore'} prin ${data.preferredContact === 'phone' ? 'telefon' : data.preferredContact === 'email' ? 'email' : 'WhatsApp'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:${emailColors.text};line-height:1.6;">
                    &#9670; Prima consultatie telefonica este gratuita si fara obligatii
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

          <p style="font-size:14px;margin:0;color:${emailColors.textLight};line-height:1.6;">
            Daca aveti intrebari urgente intre timp, nu ezitati sa ne contactati direct.
          </p>

        </td></tr>

        <!-- Contact info bar -->
        <tr><td style="background:${emailColors.navy};padding:20px 30px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td style="padding:0 12px;">
                <a href="tel:${FIRM.phoneTel}" style="color:${emailColors.goldLight};text-decoration:none;font-size:14px;font-weight:600;">${FIRM.phone}</a>
              </td>
              <td style="color:rgba(255,255,255,0.3);font-size:14px;">|</td>
              <td style="padding:0 12px;">
                <a href="mailto:${FIRM.email}" style="color:${emailColors.goldLight};text-decoration:none;font-size:14px;font-weight:600;">${FIRM.email}</a>
              </td>
            </tr>
          </table>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">${FIRM.address}</p>
          <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">${FIRM.hours}</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${emailColors.bg};padding:16px 30px;text-align:center;">
          <span style="font-size:11px;color:${emailColors.textLight};">
            Acest email a fost trimis automat. Va rugam sa nu raspundeti la acest mesaj.
          </span>
          <br/>
          <span style="font-size:11px;color:${emailColors.textLight};">
            &copy; ${new Date().getFullYear()} ${FIRM.name}. Toate drepturile rezervate.
          </span>
          <br/>
          <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin-top:10px;">
            <tr>
              <td style="padding:0 6px;"><a href="${FIRM.facebook}" style="color:${emailColors.navyMid};text-decoration:none;font-size:12px;">Facebook</a></td>
              <td style="color:${emailColors.border};font-size:12px;">|</td>
              <td style="padding:0 6px;"><a href="${FIRM.instagram}" style="color:${emailColors.navyMid};text-decoration:none;font-size:12px;">Instagram</a></td>
              <td style="color:${emailColors.border};font-size:12px;">|</td>
              <td style="padding:0 6px;"><a href="${BASE_URL}" style="color:${emailColors.navyMid};text-decoration:none;font-size:12px;">stanbaculescu.ro</a></td>
            </tr>
          </table>
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
