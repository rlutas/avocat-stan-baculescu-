'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';
import { CtaSection } from '@/components/ui/cta-section';
import { LawIcon } from '@/components/icons';
import type { LawIconName } from '@/components/icons';
import {
  GraduationCap,
  Award,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Newspaper,
  Play,
} from 'lucide-react';

interface MemberAnimatedSectionsProps {
  fullBio: string;
  specializations: string[];
  specializationSlugs: string[];
  specializationIcons: string[];
  specializationDescs: string[];
  specializationImages: string[];
  education: string[];
  experience: string[];
  bioLabel: string;
  specializationsLabel: string;
  practiceAreasLabel: string;
  educationLabel: string;
  experienceLabel: string;
  contactLabel: string;
  contactTitle: string;
  contactDescription: string;
  ctaButtonLabel: string;
  memberPhone: string;
  memberEmail: string;
  memberName: string;
  memberImage: string;
  pullQuote: string;
  phoneLabel: string;
  emailLabel: string;
  viewDetailsLabel: string;
  linkedin?: string;
  youtubeVideo?: string;
  youtubeTitle?: string;
  pressItems?: { title: string; source: string; url: string }[];
  pressLabel?: string;
  videoLabel?: string;
}

export function MemberAnimatedSections({
  fullBio,
  specializations,
  specializationSlugs,
  specializationIcons,
  specializationDescs,
  specializationImages,
  education,
  experience,
  bioLabel,
  specializationsLabel,
  practiceAreasLabel,
  educationLabel,
  experienceLabel,
  contactLabel,
  contactTitle,
  contactDescription,
  ctaButtonLabel,
  memberPhone,
  memberEmail,
  memberName,
  memberImage,
  pullQuote,
  phoneLabel,
  emailLabel,
  viewDetailsLabel,
  linkedin,
  youtubeVideo,
  youtubeTitle,
  pressItems,
  pressLabel = 'In Presa',
  videoLabel = 'Video',
}: MemberAnimatedSectionsProps) {
  return (
    <>
      {/* ── 1. Biography — white bg, editorial layout ───── */}
      <section className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-14 sm:mb-16">
            <ScrollAnimate>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Profil
              </p>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                {bioLabel}
              </h2>
              <div className="mt-4 h-[2px] w-16 bg-gold" />
            </ScrollAnimate>
          </div>

          {/* Editorial split layout */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Left column — pull quote */}
            <ScrollAnimate variant="fadeLeft" delay={0.1} className="lg:col-span-4">
              <div className="relative">
                {/* Vertical gold accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gold/40" />
                <blockquote className="pl-6">
                  <span
                    className="pointer-events-none font-heading text-7xl font-bold leading-none text-gold/20 select-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="font-heading -mt-6 text-xl font-bold leading-snug text-navy sm:text-2xl">
                    {pullQuote}
                  </p>
                  <div className="mt-5 h-[2px] w-10 bg-gold/30" />
                  <p className="mt-4 text-sm font-semibold text-navy/60">
                    &mdash; {memberName}
                  </p>
                </blockquote>
              </div>
            </ScrollAnimate>

            {/* Right column — full bio with drop cap */}
            <ScrollAnimate variant="fadeRight" delay={0.2} className="lg:col-span-8">
              <div className="relative rounded-2xl border border-black/[0.04] bg-[#f8f9fa] p-6 sm:p-8 lg:p-10">
                {/* Number watermark */}
                <span
                  className="pointer-events-none absolute right-6 top-4 font-heading text-[120px] font-bold leading-none text-navy/[0.03] select-none"
                  aria-hidden="true"
                >
                  01
                </span>
                {/* Bio text with decorative drop cap */}
                <p className="relative text-lg leading-[1.8] text-text-secondary first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-navy">
                  {fullBio}
                </p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── 2. Practice Areas / Specializations — off-white bg ── */}
      {specializations.length > 0 && (
        <section className="relative bg-[#f8f9fa] py-20 sm:py-32">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Centered section header */}
            <div className="mb-14 text-center sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  {specializationsLabel}
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {practiceAreasLabel}
                </h2>
                <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
              </ScrollAnimate>
            </div>

            {/* Card grid — matching landing page service card pattern */}
            <StaggerContainer
              className="grid gap-5 sm:grid-cols-2 lg:gap-6"
              staggerDelay={0.08}
            >
              {specializations.map((spec, i) => {
                const iconName = (specializationIcons[i] || 'balance-scale') as LawIconName;
                const slug = specializationSlugs[i] || '';
                const description = specializationDescs[i] || '';
                const num = String(i + 1).padStart(2, '0');
                const image = specializationImages[i] || '';
                // Alternating navy gradients for visual variety
                const gradients = [
                  'from-[#002a52] to-[#004a8f]',
                  'from-[#003a70] to-[#1a5a90]',
                  'from-[#1a1a2e] to-[#16213e]',
                  'from-[#002a52] to-[#003a70]',
                  'from-[#16213e] to-[#1a3a5c]',
                ];
                const gradient = gradients[i % gradients.length];

                const cardInner = (
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10">
                    {/* Visual Header - photo + gradient overlay */}
                    <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} sm:h-56`}>
                      {/* Background image */}
                      {image && (
                        <Image
                          src={image}
                          alt={spec}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      )}

                      {/* Dark gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/50 to-navy/30 transition-opacity duration-500 group-hover:from-navy/70 group-hover:via-navy/40 group-hover:to-navy/20" />

                      {/* Decorative number watermark */}
                      <span className="absolute -right-2 -top-4 z-[1] select-none font-heading text-[120px] font-bold leading-none text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.10] sm:text-[150px]">
                        {num}
                      </span>

                      {/* Large icon in glassmorphism */}
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/15 group-hover:ring-gold/40 sm:h-24 sm:w-24">
                        <LawIcon name={iconName} size={40} variant="white" />
                      </div>

                      {/* Gold accent bottom */}
                      <div className="absolute bottom-0 left-0 z-[1] h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="mb-2 font-heading text-xl font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                        {spec}
                      </h3>
                      {description && (
                        <p className="mb-4 flex-grow text-sm leading-relaxed text-text-secondary line-clamp-3">
                          {description}
                        </p>
                      )}
                      <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gold transition-all duration-300 group-hover:gap-3">
                        {viewDetailsLabel}
                        {slug ? (
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        ) : (
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <StaggerItem key={i} variant="scaleUp">
                    {slug ? (
                      <Link href={`/servicii/${slug}` as '/servicii/drept-civil'} className="block h-full">
                        {cardInner}
                      </Link>
                    ) : (
                      cardInner
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── 3. Education & Experience — white bg, timeline ── */}
      {(education.length > 0 || experience.length > 0) && (
        <section className="bg-white py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Centered section header */}
            <div className="mb-14 text-center sm:mb-16">
              <ScrollAnimate>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Background
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={0.1}>
                <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                  {educationLabel} &amp; {experienceLabel}
                </h2>
                <div className="mx-auto mt-4 h-[2px] w-24 bg-gold" />
              </ScrollAnimate>
            </div>

            {/* Two-column timeline layout */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Education timeline */}
              {education.length > 0 && (
                <ScrollAnimate delay={0.1} variant="fadeLeft">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef9e7]">
                      <GraduationCap className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy">
                      {educationLabel}
                    </h3>
                  </div>

                  <div className="relative pl-10">
                    {/* Vertical gold timeline line */}
                    <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10" />

                    <div className="space-y-5">
                      {education.map((item, i) => (
                        <div key={i} className="group relative">
                          {/* Timeline dot with pulse */}
                          <div className="absolute -left-10 top-5 flex items-center justify-center">
                            <div className="absolute h-[14px] w-[14px] animate-[timelinePulse_2s_ease-in-out_infinite] rounded-full bg-gold/20" />
                            <div className="relative h-[14px] w-[14px] rounded-full border-[2.5px] border-gold bg-white transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_0_8px_rgba(208,156,17,0.4)]" />
                          </div>

                          {/* Gold connector line from dot to card */}
                          <div className="absolute -left-[17px] top-[26px] h-[2px] w-[17px] bg-gold/30 transition-colors duration-300 group-hover:bg-gold/60" />

                          {/* Card with gold left border */}
                          <div className="rounded-2xl border border-black/[0.04] border-l-[3px] border-l-gold/50 bg-[#fafbfc] p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-navy/[0.06]">
                            <p className="text-base font-medium leading-relaxed text-text-secondary">
                              {item}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimate>
              )}

              {/* Experience timeline */}
              {experience.length > 0 && (
                <ScrollAnimate delay={0.2} variant="fadeRight">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef9e7]">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-navy">
                      {experienceLabel}
                    </h3>
                  </div>

                  <div className="relative pl-10">
                    {/* Vertical gold timeline line */}
                    <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10" />

                    <div className="space-y-5">
                      {experience.map((item, i) => (
                        <div key={i} className="group relative">
                          {/* Timeline dot with pulse */}
                          <div className="absolute -left-10 top-5 flex items-center justify-center">
                            <div className="absolute h-[14px] w-[14px] animate-[timelinePulse_2s_ease-in-out_infinite] rounded-full bg-gold/20" />
                            <div className="relative h-[14px] w-[14px] rounded-full border-[2.5px] border-gold bg-white transition-all duration-300 group-hover:bg-gold group-hover:shadow-[0_0_8px_rgba(208,156,17,0.4)]" />
                          </div>

                          {/* Gold connector line from dot to card */}
                          <div className="absolute -left-[17px] top-[26px] h-[2px] w-[17px] bg-gold/30 transition-colors duration-300 group-hover:bg-gold/60" />

                          {/* Card with gold left border */}
                          <div className="rounded-2xl border border-black/[0.04] border-l-[3px] border-l-gold/50 bg-[#fafbfc] p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-navy/[0.06]">
                            <p className="text-base font-medium leading-relaxed text-text-secondary">
                              {item}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimate>
              )}
            </div>

            {/* Timeline pulse animation */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes timelinePulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.8); opacity: 0; }
              }
            `}} />
          </div>
        </section>
      )}

      {/* ── 4. Video & Press — off-white bg ───── */}
      {(youtubeVideo || (pressItems && pressItems.length > 0)) && (
        <section className="relative bg-[#f8f9fa] py-20 sm:py-32">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* YouTube Video */}
            {youtubeVideo && (
              <div className="mb-16">
                <div className="mb-10">
                  <ScrollAnimate>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {videoLabel}
                    </p>
                  </ScrollAnimate>
                  <ScrollAnimate delay={0.1}>
                    <h2 className="font-heading text-3xl font-bold leading-[1.1] text-navy sm:text-4xl">
                      {youtubeTitle || videoLabel}
                    </h2>
                    <div className="mt-4 h-[2px] w-16 bg-gold" />
                  </ScrollAnimate>
                </div>

                <ScrollAnimate delay={0.2}>
                  <div className="relative mx-auto max-w-3xl">
                    {/* Decorative corner accents */}
                    <div className="absolute -left-3 -top-3 z-10 h-8 w-8 border-l-2 border-t-2 border-gold/40 sm:-left-4 sm:-top-4 sm:h-10 sm:w-10" />
                    <div className="absolute -right-3 -top-3 z-10 h-8 w-8 border-r-2 border-t-2 border-gold/40 sm:-right-4 sm:-top-4 sm:h-10 sm:w-10" />
                    <div className="absolute -bottom-3 -left-3 z-10 h-8 w-8 border-b-2 border-l-2 border-gold/40 sm:-bottom-4 sm:-left-4 sm:h-10 sm:w-10" />
                    <div className="absolute -bottom-3 -right-3 z-10 h-8 w-8 border-b-2 border-r-2 border-gold/40 sm:-bottom-4 sm:-right-4 sm:h-10 sm:w-10" />

                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/10 via-navy/5 to-gold/10 blur-sm" />

                    <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-navy/10" style={{ aspectRatio: '16/9' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideo.split('v=')[1]}`}
                        title={youtubeTitle || 'Video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            )}

            {/* Press Mentions */}
            {pressItems && pressItems.length > 0 && (
              <div>
                <div className="mb-10">
                  <ScrollAnimate>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                      {pressLabel}
                    </p>
                  </ScrollAnimate>
                  <ScrollAnimate delay={0.1}>
                    <h2 className="font-heading text-3xl font-bold leading-[1.1] text-navy sm:text-4xl">
                      Aparitii Media
                    </h2>
                    <div className="mt-4 h-[2px] w-16 bg-gold" />
                  </ScrollAnimate>
                </div>

                <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                  {pressItems.map((item, i) => (
                    <StaggerItem key={i} variant="scaleUp">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-2xl border border-black/[0.04] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/[0.08] sm:p-6"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Newspaper className="h-4 w-4 text-gold" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                            {item.source}
                          </span>
                        </div>
                        <h3 className="mb-4 flex-grow font-heading text-base font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-gold sm:text-lg">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-navy/50 transition-colors duration-300 group-hover:text-gold">
                          Citeste articolul
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── 5. Contact CTA — off-white bg, navy card ───── */}
      <CtaSection
        imageSrc={memberImage}
        imageAlt={memberName}
        label={contactLabel}
        title={contactTitle}
        description={contactDescription}
        buttonText={ctaButtonLabel}
        buttonHref="/contact"
        phoneText={memberPhone || undefined}
        phoneHref={memberPhone ? `tel:${memberPhone.replace(/\s/g, '')}` : undefined}
        callLabel={phoneLabel}
        className="bg-white"
        imagePosition="object-top"
      />
    </>
  );
}
