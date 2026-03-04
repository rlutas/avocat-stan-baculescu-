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
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

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
      value: 'Str. Decebal Nr. 4, Et. 1, Mun. Satu Mare, Jud. Satu Mare',
      href: 'https://maps.google.com/?q=Str.+Decebal+4,+Satu+Mare,+Romania',
    },
    {
      icon: Phone,
      label: t('phoneLabel'),
      value: '+40 745 466 720',
      href: 'tel:+40745466720',
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
    <ScrollAnimate variant="fadeRight" delay={0.15}>
      <div className="space-y-6">
        {/* Contact Details Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="font-heading mb-1 text-2xl font-bold text-navy">
            {t('title')}
          </h2>
          <div className="mb-6 mt-3 h-[2px] w-12 bg-gold" />

          <StaggerContainer className="space-y-1" staggerDelay={0.08}>
            {contactDetails.map((item, index) => (
              <StaggerItem key={index}>
                <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-gold/[0.04]">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10 transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_4px_12px_rgba(208,156,17,0.25)]">
                    <item.icon className="h-5 w-5 text-gold transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          item.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="mt-0.5 block text-base font-medium text-navy transition-colors duration-300 hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-base font-medium text-navy">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Social Media Card */}
        <ScrollAnimate variant="fadeUp" delay={0.3}>
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="font-heading mb-4 text-lg font-semibold text-navy">
              {t('socialTitle')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-navy/10 bg-navy/[0.03] text-navy transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-gold hover:text-white hover:shadow-[0_4px_12px_rgba(208,156,17,0.25)]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </ScrollAnimate>
  );
}
