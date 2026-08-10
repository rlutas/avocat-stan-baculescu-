// Cross-locale blog slug mapping
// Used by: header (language switcher), blog page (hreflang), sitemap
// Update this map when adding new blog posts with different slugs per locale.

export const blogSlugMap: Record<string, string> = {
  // RO -> EN
  'drepturile-pacientului-malpraxis': 'patient-rights-malpractice',
  'procedura-divortului-romania': 'divorce-procedure-romania',
  'drepturile-angajatului-concediere': 'employee-rights-dismissal',
  'fals-inscrisuri-semnatura-privata': 'forgery-private-documents',
  'etape-cumparare-apartament-dezvoltator': 'buying-apartment-from-developer-stages',
  // EN -> RO
  'patient-rights-malpractice': 'drepturile-pacientului-malpraxis',
  'divorce-procedure-romania': 'procedura-divortului-romania',
  'employee-rights-dismissal': 'drepturile-angajatului-concediere',
  'forgery-private-documents': 'fals-inscrisuri-semnatura-privata',
  'buying-apartment-from-developer-stages': 'etape-cumparare-apartament-dezvoltator',
};

/**
 * Given a pathname like `/blog/some-slug`, returns the mapped pathname
 * for the other locale. If not a blog article or no mapping exists,
 * returns the original pathname unchanged.
 */
export function mapBlogSlugInPathname(pathname: string): string {
  const blogArticleMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (!blogArticleMatch) return pathname;

  const currentSlug = blogArticleMatch[1];
  const mappedSlug = blogSlugMap[currentSlug];
  if (!mappedSlug) return pathname;

  return `/blog/${mappedSlug}`;
}
