'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Cookie } from 'lucide-react';
import Image from 'next/image';
import { openCookieSettings } from '@/components/cookie-consent';
import { trackPhoneClick, trackEmailClick, trackSocialClick } from '@/lib/analytics';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/despre-noi', key: 'about' },
  { href: '/echipa', key: 'team' },
  { href: '/servicii', key: 'services' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

const services = [
  { href: '/servicii/malpraxis-medical', key: 'malpraxis-medical' },
  { href: '/servicii/drept-civil', key: 'drept-civil' },
  { href: '/servicii/drept-penal', key: 'drept-penal' },
  { href: '/servicii/drept-familiei', key: 'drept-familiei' },
  { href: '/servicii/dreptul-muncii', key: 'dreptul-muncii' },
  { href: '/servicii/drept-comercial', key: 'drept-comercial' },
  { href: '/servicii/accidente-rutiere', key: 'accidente-rutiere' },
  { href: '/servicii/drept-administrativ-fiscal', key: 'drept-administrativ-fiscal' },
] as const;

const legalLinks = [
  { href: '/politica-confidentialitate', key: 'privacy' },
  { href: '/politica-cookies', key: 'cookies' },
  { href: '/termeni', key: 'terms' },
] as const;

// Custom TikTok icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations('common');
  const tFooter = useTranslations('Footer');
  const tServices = useTranslations('ServicesPage.services');
  const tCookie = useTranslations('CookieConsent');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.webp"
                alt={t('siteName')}
                width={180}
                height={60}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/70">
              {tFooter('description')}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/avocati.stanbaculescu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick({ social_platform: 'facebook', click_location: 'footer', action: 'profile_visit' })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/avocati_stanbaculescu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick({ social_platform: 'instagram', click_location: 'footer', action: 'profile_visit' })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@vladbaculescu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick({ social_platform: 'tiktok', click_location: 'footer', action: 'profile_visit' })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter('services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {tServices(`${service.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              {tFooter('contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <span className="text-sm text-white/70">
                  Str. Decebal Nr. 4, Et. 1,<br />
                  Mun. Satu Mare, Jud. Satu Mare
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-gold" />
                <a
                  href="tel:+40745466720"
                  onClick={() => trackPhoneClick('footer', 'unknown')}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  +40 745 466 720
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-gold" />
                <a
                  href="mailto:office@stanbaculescu.ro"
                  onClick={() => trackEmailClick('footer')}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  office@stanbaculescu.ro
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-gold" />
                <span className="text-sm text-white/70">
                  {tFooter('hours')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Row 1: Copyright + Crafted by */}
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3 md:items-start">
              <p className="text-sm text-white/50">
                &copy; {currentYear} {t('siteName')}. {tFooter('copyright')}
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=40745850700&text=Bun%C4%83%21+Am+v%C4%83zut+site-ul+stanbaculescu.ro+%C8%99i+a%C8%99+vrea+s%C4%83+discut%C4%83m+despre+dezvoltarea+unui+website.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-gold"
              >
                <span className="text-gold/50 group-hover:text-gold">&lt;/&gt;</span>
                Crafted by <span className="font-semibold text-gold/70 group-hover:text-gold">Luțaș Raul</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              {legalLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-gold"
                >
                  {tFooter(`legal.${link.key}`)}
                </Link>
              ))}
              <button
                onClick={openCookieSettings}
                className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-gold"
              >
                <Cookie className="h-3 w-3" />
                {tCookie('settingsLink')}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
