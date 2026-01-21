import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { posts } from '#site/content';
import { BlogHero, BlogListClient, BlogCta } from '@/components/blog';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'ro'
      ? 'Blog Juridic | Cabinet de Avocatura Stan-Baculescu'
      : 'Legal Blog | Stan-Baculescu Law Firm';
  const description =
    locale === 'ro'
      ? 'Articole si informatii juridice utile despre drept civil, penal, familiei, muncii si alte domenii. Aflati drepturile dumneavoastra de la avocati specializati.'
      : 'Useful legal articles and information about civil, criminal, family, labor law and other areas. Learn your rights from specialized lawyers.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
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
      category: post.category,
      image: post.image,
    }));

  return (
    <main>
      <BlogHero />
      <BlogListClient posts={localePosts} />
      <BlogCta />
    </main>
  );
}
