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
import { Menu, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/despre-noi', key: 'about' },
  { href: '/echipa', key: 'team' },
  { href: '/servicii', key: 'services' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

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
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-navy transition-colors" />
            <span className="text-xl font-bold tracking-tight text-navy transition-colors">
              {t('siteName')}
            </span>
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
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => switchLanguage(otherLocale)}
              className="rounded-full bg-navy/10 px-3 py-1 text-sm font-semibold text-navy transition-colors hover:bg-navy/20"
            >
              {otherLocale.toUpperCase()}
            </button>

            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-navy hover:bg-navy/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-l-navy/10 bg-navy"
              >
                <SheetTitle className="flex items-center gap-2">
                  <Scale className="h-6 w-6 text-gold" />
                  <span className="text-lg font-bold text-white">
                    {t('siteName')}
                  </span>
                </SheetTitle>
                <nav className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-white/10 text-gold'
                          : 'text-white hover:bg-white/5 hover:text-gold'
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8">
                  <Button
                    asChild
                    className="w-full bg-gold font-semibold text-navy hover:bg-gold-light"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.contact')}
                    </Link>
                  </Button>
                </div>

                {/* Mobile Language Switcher */}
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium text-white/60">
                    {t('language.ro') === 'Romana' ? 'Limba' : 'Language'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        switchLanguage('ro');
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                        locale === 'ro'
                          ? 'bg-gold text-navy'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      )}
                    >
                      {t('language.ro')}
                    </button>
                    <button
                      onClick={() => {
                        switchLanguage('en');
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                        locale === 'en'
                          ? 'bg-gold text-navy'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      )}
                    >
                      {t('language.en')}
                    </button>
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
