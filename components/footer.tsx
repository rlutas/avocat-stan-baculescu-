'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Scale, MapPin, Phone, Mail, Clock, Facebook, Instagram, Cookie } from 'lucide-react';
import { openCookieSettings } from '@/components/cookie-consent';

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
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold tracking-tight">
                {t('siteName')}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {tFooter('description')}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/cabinetavocaturastanbaculescu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-amber-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/cabinet_stan_baculescu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-amber-600 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@cabinetavocat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-amber-600 hover:text-white"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-amber-500">
              {tFooter('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-amber-500"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-amber-500">
              {tFooter('services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-400 transition-colors hover:text-amber-500"
                  >
                    {tServices(`${service.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-amber-500">
              {tFooter('contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-sm text-slate-400">
                  Str. Aurel Popp nr. 2,<br />
                  Satu Mare, Romania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <a
                  href="tel:+40261848015"
                  className="text-sm text-slate-400 transition-colors hover:text-amber-500"
                >
                  +40 261-848-015
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <a
                  href="mailto:office@stanbaculescu.ro"
                  className="text-sm text-slate-400 transition-colors hover:text-amber-500"
                >
                  office@stanbaculescu.ro
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-sm text-slate-400">
                  {tFooter('hours')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              &copy; {currentYear} {t('siteName')}. {tFooter('copyright')}
            </p>

            {/* Legal Links */}
            <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-slate-500 transition-colors hover:text-amber-500"
                >
                  {tFooter(`legal.${link.key}`)}
                </Link>
              ))}
              <button
                onClick={openCookieSettings}
                className="flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-amber-500"
              >
                <Cookie className="h-3.5 w-3.5" />
                {tCookie('settingsLink')}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
