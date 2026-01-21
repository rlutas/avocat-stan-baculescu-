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
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/despre-noi', key: 'about' },
  { href: '/echipa', key: 'team' },
  { href: '/servicii', key: 'services' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

// Animated hamburger icon component
function AnimatedHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-6 w-7 flex flex-col justify-center items-center">
      <span
        className={cn(
          'absolute h-0.5 w-7 bg-navy rounded-full transition-all duration-300 ease-out',
          isOpen ? 'rotate-45 bg-gold' : '-translate-y-2'
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-5 bg-navy rounded-full transition-all duration-300 ease-out',
          isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-7 bg-navy rounded-full transition-all duration-300 ease-out',
          isOpen ? '-rotate-45 bg-gold' : 'translate-y-2'
        )}
      />
    </div>
  );
}

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language switcher handler
  const switchLanguage = (newLocale: 'ro' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const otherLocale = locale === 'ro' ? 'en' : 'ro';

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm'
          : 'bg-white'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt={t('siteName')}
              width={220}
              height={73}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-navy after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold'
                    : 'text-navy hover:text-gold'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher & CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full border border-navy/20 p-1">
              <button
                onClick={() => switchLanguage('ro')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all',
                  locale === 'ro'
                    ? 'bg-navy text-white'
                    : 'text-navy/60 hover:text-navy'
                )}
              >
                RO
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all',
                  locale === 'en'
                    ? 'bg-navy text-white'
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
                  <AnimatedHamburger isOpen={isMobileMenuOpen} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm border-l-gold/20 bg-gradient-to-br from-[#002a52] via-[#003a70] to-[#004a8f] p-0 overflow-hidden"
                closeClassName="text-white hover:text-gold hover:bg-white/10 p-2 rounded-lg"
              >
                {/* Decorative gold circle */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute -left-10 bottom-20 h-40 w-40 rounded-full bg-gold/5 blur-2xl" />

                <div className="relative z-10 flex h-full flex-col p-6">
                  {/* Logo */}
                  <SheetTitle className="flex items-center pb-6 border-b border-white/10">
                    <Image
                      src="/images/logo.png"
                      alt={t('siteName')}
                      width={160}
                      height={53}
                      className="h-12 w-auto brightness-0 invert"
                    />
                  </SheetTitle>

                  {/* Navigation */}
                  <nav className="mt-6 flex flex-col gap-1 flex-1">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300',
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
                    ))}
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
                            ? 'bg-gold text-navy shadow-lg'
                            : 'text-white/70 hover:text-white'
                        )}
                      >
                        🇷🇴 Română
                      </button>
                      <button
                        onClick={() => {
                          switchLanguage('en');
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          'flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300',
                          locale === 'en'
                            ? 'bg-gold text-navy shadow-lg'
                            : 'text-white/70 hover:text-white'
                        )}
                      >
                        🇬🇧 English
                      </button>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className="w-full h-12 bg-gold font-semibold text-navy text-base hover:bg-gold-light shadow-[0_4px_20px_rgba(208,156,17,0.3)] hover:shadow-[0_6px_30px_rgba(208,156,17,0.4)] transition-all duration-300"
                    >
                      <Link
                        href="tel:+40261848015"
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
                      className="w-full h-12 bg-transparent border-white/20 text-white text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300"
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
