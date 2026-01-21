'use client';

import { useTranslations } from 'next-intl';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
} from 'lucide-react';

// TikTok icon component since lucide-react doesn't have it
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

export function ContactInfo() {
  const t = useTranslations('ContactPage.info');

  const contactDetails = [
    {
      icon: MapPin,
      label: t('addressLabel'),
      value: 'Str. Aurel Popp 2, Satu Mare 440014, Romania',
      href: 'https://maps.google.com/?q=Str.+Aurel+Popp+2,+Satu+Mare,+Romania',
    },
    {
      icon: Phone,
      label: t('phoneLabel'),
      value: '+40 261-848-015',
      href: 'tel:+40261848015',
    },
    {
      icon: Mail,
      label: t('emailLabel'),
      value: 'office@stanbaculescu.ro',
      href: 'mailto:office@stanbaculescu.ro',
    },
    {
      icon: Clock,
      label: t('hoursLabel'),
      value: t('hoursValue'),
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com/stanbaculescu',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/stanbaculescu',
    },
    {
      icon: TikTokIcon,
      label: 'TikTok',
      href: 'https://tiktok.com/@stanbaculescu',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Details Card */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="font-heading mb-6 text-2xl font-bold text-navy">
          {t('title')}
        </h2>
        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#fef9e7]">
                <item.icon className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#4b5563]">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="text-lg text-[#1f2937] hover:text-gold transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg text-[#1f2937]">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Card */}
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h3 className="font-heading mb-4 text-lg font-semibold text-navy">
          {t('socialTitle')}
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10 text-navy transition-all hover:bg-gold hover:text-navy"
              aria-label={social.label}
            >
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
