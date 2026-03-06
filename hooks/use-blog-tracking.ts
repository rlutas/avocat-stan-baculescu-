'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackBlogScrollDepth, trackArticleRead } from '@/lib/analytics';

export function useBlogTracking({ articleTitle, articleSlug, language }: {
  articleTitle: string;
  articleSlug: string;
  language: string;
}) {
  const scrollMilestones = useRef(new Set<number>());
  const startTime = useRef(Date.now());
  const articleReadFired = useRef(false);

  const checkArticleRead = useCallback(() => {
    if (articleReadFired.current) return;
    const timeSpent = (Date.now() - startTime.current) / 1000;
    if (scrollMilestones.current.has(75) && timeSpent >= 60) {
      articleReadFired.current = true;
      trackArticleRead({ article_title: articleTitle, article_slug: articleSlug, read_time_seconds: Math.round(timeSpent), language });
    }
  }, [articleTitle, articleSlug, language]);

  useEffect(() => {
    const contentEl = document.querySelector('.blog-content');
    if (!contentEl) return;

    const handleScroll = () => {
      const rect = contentEl.getBoundingClientRect();
      const contentTop = window.scrollY + rect.top;
      const scrollPosition = window.scrollY + window.innerHeight;
      const percentScrolled = Math.min(100, Math.max(0, ((scrollPosition - contentTop) / rect.height) * 100));

      for (const milestone of [25, 50, 75, 100]) {
        if (percentScrolled >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackBlogScrollDepth({ percent_scrolled: milestone, article_title: articleTitle, article_slug: articleSlug });
          if (milestone >= 75) checkArticleRead();
        }
      }
    };

    const timeInterval = setInterval(checkArticleRead, 10000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(timeInterval); };
  }, [articleTitle, articleSlug, checkArticleRead]);
}
