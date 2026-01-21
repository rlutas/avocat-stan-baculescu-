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
import { Menu, X, Scale } from 'lucide-react';
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
          ? 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Scale
              className={cn(
                'h-8 w-8 transition-colors',
                isScrolled ? 'text-slate-900' : 'text-white'
              )}
            />
            <span
              className={cn(
                'text-xl font-bold tracking-tight transition-colors',
                isScrolled ? 'text-slate-900' : 'text-white'
              )}
            >
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
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? isScrolled
                      ? 'bg-slate-100 text-slate-900'
                      : 'bg-white/20 text-white'
                    : isScrolled
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher & CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full border border-current/20 p-1">
              <button
                onClick={() => switchLanguage('ro')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all',
                  locale === 'ro'
                    ? isScrolled
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-900'
                    : isScrolled
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/70 hover:text-white'
                )}
              >
                RO
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={cn(
                  'rounded-full px-3 py-1 text-sm font-medium transition-all',
                  locale === 'en'
                    ? isScrolled
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-900'
                    : isScrolled
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/70 hover:text-white'
                )}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className={cn(
                'font-semibold transition-colors',
                isScrolled
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              )}
            >
              <Link href="/contact">{t('nav.contact')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => switchLanguage(otherLocale)}
              className={cn(
                'rounded-full px-3 py-1 text-sm font-semibold transition-colors',
                isScrolled
                  ? 'bg-slate-100 text-slate-900'
                  : 'bg-white/20 text-white'
              )}
            >
              {otherLocale.toUpperCase()}
            </button>

            {/* Hamburger Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-10 w-10',
                    isScrolled
                      ? 'text-slate-900 hover:bg-slate-100'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="flex items-center gap-2">
                  <Scale className="h-6 w-6 text-slate-900" />
                  <span className="text-lg font-bold">{t('siteName')}</span>
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
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
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
                    className="w-full bg-amber-600 font-semibold text-white hover:bg-amber-700"
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
                  <p className="mb-2 text-sm font-medium text-slate-500">
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
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
