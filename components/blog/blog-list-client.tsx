'use client';

import { useState, useMemo } from 'react';
import { BlogGrid } from './blog-grid';

type Post = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  image?: string;
};

type BlogListClientProps = {
  posts: Post[];
  postsPerPage?: number;
};

export function BlogListClient({ posts, postsPerPage = 6 }: BlogListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map((post) => post.category));
    return Array.from(cats).sort();
  }, [posts]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <BlogGrid
      posts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedCategory={selectedCategory}
      categories={categories}
      onCategoryChange={handleCategoryChange}
      onPageChange={setCurrentPage}
    />
  );
}
