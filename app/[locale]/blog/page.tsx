import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { posts } from '#site/content';
import { BlogHero, BlogListClient, BlogCta } from '@/components/blog';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Blog Juridic - Informatii Legale | SCA Stan-Baculescu'
      : 'Legal Blog - Useful Legal Info | SCA Stan-Baculescu';
  const description =
    locale === 'ro'
      ? 'Articole si informatii juridice utile despre drept civil, penal, familiei, muncii si alte domenii. Aflati drepturile dumneavoastra de la avocati specializati.'
      : 'Useful legal articles and information about civil, criminal, family, labor law and other areas. Learn about your rights from specialized lawyers.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      url: `${BASE_URL}/${locale}/blog`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/blog`,
        'en-US': `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/ro/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Filter posts by locale and published status, sort by date descending
  const localePosts = posts
    .filter((post) => post.locale === locale && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
      author: post.author,
      authorImage: post.authorImage,
      category: post.category,
      image: post.image,
    }));

  const blogTitle =
    locale === 'ro' ? 'Blog Juridic' : 'Legal Blog';

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: blogTitle,
    numberOfItems: localePosts.length,
    itemListElement: localePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: 'Blog' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <main>
        <BlogHero />
        <BlogListClient posts={localePosts} />
        <BlogCta />
      </main>
    </>
  );
}
