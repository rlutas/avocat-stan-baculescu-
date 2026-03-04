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
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/10">
          <Share2 className="w-4 h-4 text-gold" />
        </div>
        <span className="text-navy font-heading font-semibold text-lg">{t('shareArticle')}</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-navy text-white transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-navy text-white transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-navy text-white transition-all duration-300 hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
            copied
              ? 'bg-gold text-navy shadow-lg shadow-gold/20'
              : 'bg-navy text-white hover:bg-gold hover:text-navy hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </button>
        {copied && (
          <span className="text-sm font-medium text-gold animate-pulse">
            Link copiat!
          </span>
        )}
      </div>
    </div>
  );
}
