import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { posts } from '#site/content';
import { BlogArticle, RelatedArticles, BlogCta } from '@/components/blog';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

// Cross-locale blog slug mapping for hreflang
const blogSlugPairs: Record<string, string> = {
  // RO → EN
  'drepturile-pacientului-malpraxis': 'patient-rights-malpractice',
  'procedura-divortului-romania': 'divorce-procedure-romania',
  'drepturile-angajatului-concediere': 'employee-rights-dismissal',
  // EN → RO
  'patient-rights-malpractice': 'drepturile-pacientului-malpraxis',
  'divorce-procedure-romania': 'procedura-divortului-romania',
  'employee-rights-dismissal': 'drepturile-angajatului-concediere',
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const post = posts.find(
    (p) => p.slug === slug && p.locale === locale && p.published
  );

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Stan-Baculescu`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      images: post.image ? [post.image] : undefined,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/blog/${locale === 'ro' ? slug : (blogSlugPairs[slug] || slug)}`,
        'en-US': `${BASE_URL}/en/blog/${locale === 'en' ? slug : (blogSlugPairs[slug] || slug)}`,
        'x-default': `${BASE_URL}/ro/blog/${locale === 'ro' ? slug : (blogSlugPairs[slug] || slug)}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = posts.find(
    (p) => p.slug === slug && p.locale === locale && p.published
  );

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different slug, same locale)
  const relatedPosts = posts
    .filter(
      (p) =>
        p.locale === locale &&
        p.published &&
        p.category === post.category &&
        p.slug !== post.slug
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      date: p.date,
      author: p.author,
      authorImage: p.authorImage,
      category: p.category,
      image: p.image,
    }));

  // Generate JSON-LD structured data for article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? `https://stanbaculescu.ro${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@id': 'https://stanbaculescu.ro/#organization',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://stanbaculescu.ro/${locale}/blog/${slug}`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: 'Blog', url: `https://stanbaculescu.ro/${locale}/blog` },
          { name: post.title },
        ]}
      />
      <BlogArticle
        title={post.title}
        description={post.description}
        date={post.date}
        author={post.author}
        authorImage={post.authorImage}
        category={post.category}
        content={post.body}
        image={post.image}
      />
      <RelatedArticles posts={relatedPosts} />
      <BlogCta />
    </main>
  );
}
