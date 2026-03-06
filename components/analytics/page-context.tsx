'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pushPageContext } from '@/lib/analytics';

interface PageContextProps {
  pageType: string;
  language: string;
  practiceArea?: string;
  contentGroup?: string;
}

export function PageContext({ pageType, language, practiceArea, contentGroup }: PageContextProps) {
  const pathname = usePathname();

  useEffect(() => {
    pushPageContext({
      page_type: pageType,
      language,
      practice_area: practiceArea,
      content_group: contentGroup || deriveContentGroup(pageType),
    });
  }, [pathname, pageType, language, practiceArea, contentGroup]);

  return null;
}

function deriveContentGroup(pageType: string): string {
  switch (pageType) {
    case 'contact':
    case 'service':
      return 'lead_generation';
    case 'blog_article':
    case 'blog_list':
      return 'informational';
    case 'about':
    case 'team':
    case 'team_member':
      return 'brand';
    default:
      return 'general';
  }
}
