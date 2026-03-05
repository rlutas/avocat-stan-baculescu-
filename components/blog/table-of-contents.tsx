'use client';

import { List } from 'lucide-react';

type TableOfContentsProps = {
  content: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = Array.from(content.matchAll(/^## (.+)$/gm)).map(
    (match) => ({
      text: match[1].trim(),
      slug: slugify(match[1].trim()),
    })
  );

  if (headings.length === 0) return null;

  return (
    <nav className="table-of-contents">
      <div className="table-of-contents-title">
        <List className="h-5 w-5" />
        Cuprins
      </div>
      <ol>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
