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
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      {/* Contact Details Card */}
      <div className="animate-fade-in-up rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <h2 className="font-heading mb-6 text-2xl font-bold text-navy">
          {t('title')}
        </h2>
        <div className="space-y-5">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-[#fef9e7]/50 hover:shadow-md"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#fef9e7] transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_4px_10px_rgba(208,156,17,0.3)]">
                <item.icon className="h-6 w-6 text-gold transition-colors duration-300 group-hover:text-navy" />
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
                    className="text-lg font-medium text-navy hover:text-gold transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg font-medium text-navy">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Card */}
      <div className="animate-fade-in-up delay-500 rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
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
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-navy hover:shadow-[0_4px_10px_rgba(208,156,17,0.3)]"
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
