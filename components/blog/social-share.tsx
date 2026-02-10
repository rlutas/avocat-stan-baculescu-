'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Linkedin, Link2, Check, Share2 } from 'lucide-react';
import { useState } from 'react';

type SocialShareProps = {
  title: string;
  description: string;
};

export function SocialShare({ title, description }: SocialShareProps) {
  const t = useTranslations('BlogPage');
  const [copied, setCopied] = useState(false);

  // Get the full URL (will work on client-side)
  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const shareUrl = getFullUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fef9e7]">
          <Share2 className="w-4 h-4 text-gold" />
        </div>
        <span className="text-navy font-semibold">{t('shareArticle')}</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-xl bg-[#f8f9fa] text-navy hover:bg-navy hover:text-white transition-all duration-300 ring-1 ring-transparent hover:ring-navy"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-xl bg-[#f8f9fa] text-navy hover:bg-navy hover:text-white transition-all duration-300 ring-1 ring-transparent hover:ring-navy"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-xl bg-[#f8f9fa] text-navy hover:bg-navy hover:text-white transition-all duration-300 ring-1 ring-transparent hover:ring-navy"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className={`p-3 rounded-xl transition-all duration-300 ring-1 ${
            copied
              ? 'bg-gold text-navy ring-gold'
              : 'bg-[#fef9e7] text-gold hover:bg-gold hover:text-navy ring-transparent hover:ring-gold'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
