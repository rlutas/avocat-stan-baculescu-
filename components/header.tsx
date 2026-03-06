'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Phone, ChevronDown } from 'lucide-react';
import { LawIcon, serviceIconMap } from '@/components/icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { mapBlogSlugInPathname } from '@/lib/blog-slugs';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/despre-noi', key: 'about' },
  { href: '/echipa', key: 'team' },
  { href: '/servicii', key: 'services', hasDropdown: true },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

const serviceItems = [
  { id: 'malpraxis-medical', href: '/servicii/malpraxis-medical' },
  { id: 'drept-civil', href: '/servicii/drept-civil' },
  { id: 'drept-penal', href: '/servicii/drept-penal' },
  { id: 'drept-familiei', href: '/servicii/drept-familiei' },
  { id: 'dreptul-muncii', href: '/servicii/dreptul-muncii' },
  { id: 'drept-comercial', href: '/servicii/drept-comercial' },
  { id: 'accidente-rutiere', href: '/servicii/accidente-rutiere' },
  { id: 'drept-administrativ-fiscal', href: '/servicii/drept-administrativ-fiscal' },
] as const;

// Animated hamburger icon component
function AnimatedHamburger({ isOpen, isTransparent }: { isOpen: boolean; isTransparent?: boolean }) {
  const barColor = isOpen ? 'bg-gold' : isTransparent ? 'bg-white' : 'bg-navy';
  return (
    <div className="relative h-6 w-7 flex flex-col justify-center items-center">
      <span
        className={cn(
          'absolute h-0.5 w-7 rounded-full transition-all duration-300 ease-out',
          barColor,
          isOpen ? 'rotate-45' : '-translate-y-2'
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-5 rounded-full transition-all duration-300 ease-out',
          barColor,
          isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-7 rounded-full transition-all duration-300 ease-out',
          barColor,
          isOpen ? '-rotate-45' : 'translate-y-2'
        )}
      />
    </div>
  );
}

export function Header() {
  const t = useTranslations('common');
  const tServices = useTranslations('ServicesPage.services');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  // Detect if we're on the homepage
  // usePathname from next-intl returns the path without locale prefix, so '/' is always the homepage
  const isHomepage = pathname === '/';
  const isTransparent = isHomepage && !isScrolled;

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language switcher handler
  // Maps blog article slugs to the other locale's slug before navigating
  const switchLanguage = (newLocale: 'ro' | 'en') => {
    const targetPathname = mapBlogSlugInPathname(pathname);
    router.replace(targetPathname, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : isScrolled
            ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm'
            : 'bg-white'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt={t('siteName')}
              width={220}
              height={73}
              className={cn(
                'h-16 w-auto transition-all duration-300',
                isTransparent && 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const hasDropdown = 'hasDropdown' in item && item.hasDropdown;

              if (hasDropdown) {
                return (
                  <div key={item.key} className="relative group">
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300',
                        pathname === item.href || pathname.startsWith('/servicii/')
                          ? isTransparent
                            ? 'text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold'
                            : 'text-navy after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold'
                          : isTransparent
                            ? 'text-white/90 hover:text-gold'
                            : 'text-navy hover:text-gold'
                      )}
                    >
                      {t(`nav.${item.key}`)}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-navy rounded-lg shadow-xl py-2 min-w-[280px] border border-navy-light/10">
                        {serviceItems.map((service) => (
                            <Link
                              key={service.id}
                              href={service.href}
                              className={cn(
                                'group flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-gold transition-colors',
                                pathname === service.href && 'bg-white/10 text-gold'
                              )}
                            >
                              <LawIcon name={serviceIconMap[service.id]} size={20} className="flex-shrink-0 icon-hover-gold" variant="white" />
                              <span>{tServices(`${service.id}.title`)}</span>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300',
                    pathname === item.href
                      ? isTransparent
                        ? 'text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold'
                        : 'text-navy after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold'
                      : isTransparent
                        ? 'text-white/90 hover:text-gold'
                        : 'text-navy hover:text-gold'
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Language Switcher & CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Language Switcher */}
            <div className={cn(
              'flex items-center rounded-full border p-1 transition-all duration-300',
              isTransparent ? 'border-white/30' : 'border-navy/20'
            )}>
              <button
                onClick={() => switchLanguage('ro')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all duration-300',
                  locale === 'ro'
                    ? isTransparent
                      ? 'bg-white/20 text-white'
                      : 'bg-navy text-white'
                    : isTransparent
                      ? 'text-white/60 hover:text-white'
                      : 'text-navy/60 hover:text-navy'
                )}
              >
                RO
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all duration-300',
                  locale === 'en'
                    ? isTransparent
                      ? 'bg-white/20 text-white'
                      : 'bg-navy text-white'
                    : isTransparent
                      ? 'text-white/60 hover:text-white'
                      : 'text-navy/60 hover:text-navy'
                )}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="bg-gold font-semibold text-navy shadow-[var(--shadow-gold)] transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold-lg)]"
            >
              <Link href="/contact">{t('nav.contact')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex h-12 w-12 items-center justify-center transition-all duration-300 active:scale-95"
                  aria-label="Toggle menu"
                >
                  <AnimatedHamburger isOpen={isMobileMenuOpen} isTransparent={isTransparent} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm border-l-gold/20 bg-gradient-to-br from-navy-dark via-navy to-navy-light p-0 overflow-hidden"
                closeClassName="top-6 right-6 z-20 text-white hover:text-gold hover:bg-white/10 p-2 rounded-lg"
              >
                {/* Decorative gold circle */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-20 h-40 w-40 rounded-full bg-gold/5 blur-2xl" />

                <div className="relative z-10 flex h-full flex-col p-6">
                  {/* Logo */}
                  <SheetTitle className="flex items-center pb-6 border-b border-white/10">
                    <Image
                      src="/images/logo.webp"
                      alt={t('siteName')}
                      width={160}
                      height={53}
                      className="h-12 w-auto brightness-0 invert"
                    />
                  </SheetTitle>

                  {/* Navigation */}
                  <nav className="mt-6 flex flex-col gap-1 flex-1">
                    {navItems.map((item, index) => {
                      const hasDropdown = 'hasDropdown' in item && item.hasDropdown;

                      if (hasDropdown) {
                        return (
                          <div key={item.key}>
                            {/* Services Header with Toggle */}
                            <button
                              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                              className={cn(
                                'group relative flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-heading text-base font-medium transition-all duration-300',
                                pathname === item.href || pathname.startsWith('/servicii/')
                                  ? 'bg-gold/20 text-gold'
                                  : 'text-white/90 hover:bg-white/5 hover:text-gold hover:translate-x-1'
                              )}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <span className="flex items-center gap-3">
                                {(pathname === item.href || pathname.startsWith('/servicii/')) && (
                                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gold" />
                                )}
                                {t(`nav.${item.key}`)}
                              </span>
                              <ChevronDown
                                className={cn(
                                  'h-5 w-5 transition-transform duration-300',
                                  isServicesExpanded && 'rotate-180'
                                )}
                              />
                            </button>

                            {/* Services List */}
                            <div
                              className={cn(
                                'overflow-hidden transition-all duration-300 ease-in-out',
                                isServicesExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                              )}
                            >
                              <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-4">
                                {/* Link to All Services */}
                                <Link
                                  href="/servicii"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={cn(
                                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                                    pathname === '/servicii'
                                      ? 'bg-gold/20 text-gold'
                                      : 'text-white/70 hover:bg-white/5 hover:text-gold'
                                  )}
                                >
                                  <LawIcon name="balance-scale" size={16} className="icon-hover-gold" variant="white" />
                                  <span>{t('nav.allServices')}</span>
                                </Link>
                                {serviceItems.map((service) => (
                                    <Link
                                      key={service.id}
                                      href={service.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className={cn(
                                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                                        pathname === service.href
                                          ? 'bg-gold/20 text-gold'
                                          : 'text-white/70 hover:bg-white/5 hover:text-gold'
                                      )}
                                    >
                                      <LawIcon name={serviceIconMap[service.id]} size={16} className="icon-hover-gold" variant="white" />
                                      <span>{tServices(`${service.id}.title`)}</span>
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'group relative flex items-center gap-3 rounded-xl px-4 py-3.5 font-heading text-base font-medium transition-all duration-300',
                            pathname === item.href
                              ? 'bg-gold/20 text-gold'
                              : 'text-white/90 hover:bg-white/5 hover:text-gold hover:translate-x-1'
                          )}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {pathname === item.href && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gold" />
                          )}
                          {t(`nav.${item.key}`)}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Bottom section */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    {/* Language Switcher */}
                    <div className="flex items-center justify-center gap-1 p-1 bg-white/5 rounded-full">
                      <button
                        onClick={() => {
                          switchLanguage('ro');
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          'flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300',
                          locale === 'ro'
                            ? 'bg-gold text-navy shadow-[var(--shadow-gold)]'
                            : 'text-white/70 hover:text-white'
                        )}
                      >
                        RO
                      </button>
                      <button
                        onClick={() => {
                          switchLanguage('en');
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          'flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300',
                          locale === 'en'
                            ? 'bg-gold text-navy shadow-[var(--shadow-gold)]'
                            : 'text-white/70 hover:text-white'
                        )}
                      >
                        EN
                      </button>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className="w-full h-12 bg-gold font-semibold text-navy text-base hover:bg-gold-light shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-lg)] transition-all duration-300"
                    >
                      <Link
                        href="tel:+40745466720"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        {t('callNow')}
                      </Link>
                    </Button>

                    {/* Contact button */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 bg-transparent border-white/20 text-white text-base hover:bg-white/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
                    >
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t('nav.contact')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
