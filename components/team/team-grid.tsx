'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import {
  ScrollAnimate,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/scroll-animate';

type TeamMember = {
  id: string;
  nameKey: string;
  roleKey: string;
  image: string;
  category: 'founder' | 'collaborator' | 'support';
  specializationKeys?: string[];
};

const teamMembers: TeamMember[] = [
  {
    id: 'camelia-stan',
    nameKey: 'cameliaStan',
    roleKey: 'founder',
    image: '/images/team/camielia-stan.webp',
    category: 'founder',
    specializationKeys: ['spec1', 'spec2'],
  },
  {
    id: 'vlad-baculescu',
    nameKey: 'vladBaculescu',
    roleKey: 'founder',
    image: '/images/team/vlad-baculescu.webp',
    category: 'founder',
    specializationKeys: ['spec1', 'spec2'],
  },
  {
    id: 'diana-chincea',
    nameKey: 'dianaChincea',
    roleKey: 'collaborator',
    image: '/images/team/diana-chincea.webp',
    category: 'collaborator',
    specializationKeys: ['spec1', 'spec2'],
  },
  {
    id: 'cristina-blan',
    nameKey: 'cristinaBlan',
    roleKey: 'collaborator',
    image: '/images/team/cristina-blan.webp',
    category: 'collaborator',
    specializationKeys: ['spec1', 'spec2'],
  },
  {
    id: 'alexandra-rusu',
    nameKey: 'alexandraRusu',
    roleKey: 'collaborator',
    image: '/images/team/alexandra-rusu.webp',
    category: 'collaborator',
    specializationKeys: ['spec1', 'spec2'],
  },
  {
    id: 'diana-veres',
    nameKey: 'dianaVeres',
    roleKey: 'clientRelations',
    image: '/images/team/diana-veres.webp',
    category: 'support',
    specializationKeys: ['spec1', 'spec2'],
  },
];

export function TeamGrid() {
  const t = useTranslations('TeamPage');

  const founders = teamMembers.filter((m) => m.category === 'founder');
  const collaborators = teamMembers.filter((m) => m.category === 'collaborator');
  const support = teamMembers.filter((m) => m.category === 'support');

  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Founders ── */}
        <div className="mb-20 sm:mb-28">
          <ScrollAnimate className="mb-12 sm:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Conducere
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
              {t('sections.founders')}
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-gold" />
          </ScrollAnimate>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:gap-8"
            staggerDelay={0.15}
          >
            {founders.map((member) => (
              <StaggerItem key={member.id} variant="scaleUp">
                <FounderCard member={member} t={t} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Collaborators ── */}
        <div className="mb-20 sm:mb-28">
          <ScrollAnimate className="mb-12 sm:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Echipa
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
              {t('sections.collaborators')}
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-gold" />
          </ScrollAnimate>

          <StaggerContainer
            className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
            staggerDelay={0.1}
          >
            {collaborators.map((member) => (
              <StaggerItem key={member.id} variant="scaleUp">
                <CollaboratorCard member={member} t={t} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Support / Client Relations ── */}
        {support.length > 0 && (
          <div>
            <ScrollAnimate className="mb-12 sm:mb-14">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {t('sections.support')}
              </p>
              <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
                {t('sections.supportTitle')}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-gold" />
            </ScrollAnimate>

            <StaggerContainer
              className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
              staggerDelay={0.1}
            >
              {support.map((member) => (
                <StaggerItem key={member.id} variant="scaleUp">
                  <CollaboratorCard member={member} t={t} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOUNDER CARD  (large, photo + info overlay)
───────────────────────────────────────────── */
function FounderCard({
  member,
  t,
}: {
  member: TeamMember;
  t: ReturnType<typeof useTranslations<'TeamPage'>>;
}) {
  return (
    <Link href={`/echipa/${member.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-navy">
        {/* Photo */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5]">
          <Image
            src={member.image}
            alt={t(`members.${member.nameKey}.name`)}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </div>

        {/* Content at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          {/* Role badge */}
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {t(`roles.${member.roleKey}`)}
          </span>

          {/* Name */}
          <h3 className="mb-2 font-heading text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-3xl">
            {t(`members.${member.nameKey}.name`)}
          </h3>

          {/* Short bio */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/65 sm:text-base">
            {t(`members.${member.nameKey}.shortBio`)}
          </p>

          {/* Specialization tags */}
          {member.specializationKeys && (
            <div className="mb-4 flex flex-wrap gap-2">
              {member.specializationKeys.map((specKey) => {
                const fullKey = `members.${member.nameKey}.specializations.${specKey}` as Parameters<typeof t>[0];
                return (
                  <span
                    key={specKey}
                    className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold/90"
                  >
                    {t(fullKey)}
                  </span>
                );
              })}
            </div>
          )}

          {/* View profile link — reveals on hover */}
          <div className="flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
            {t('viewProfile')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Gold top accent line — reveals on hover */}
        <div className="absolute left-0 right-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   COLLABORATOR CARD  (compact 3-column)
───────────────────────────────────────────── */
function CollaboratorCard({
  member,
  t,
}: {
  member: TeamMember;
  t: ReturnType<typeof useTranslations<'TeamPage'>>;
}) {
  return (
    <Link href={`/echipa/${member.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-navy sm:rounded-2xl">
        {/* Photo */}
        <div className="relative aspect-[3/4]">
          <Image
            src={member.image}
            alt={t(`members.${member.nameKey}.name`)}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 33vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
        </div>

        {/* Name / role at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
          <span className="mb-1 hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-gold sm:block">
            {t(`roles.${member.roleKey}`)}
          </span>
          <h3 className="font-heading text-sm font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-lg">
            {t(`members.${member.nameKey}.name`)}
          </h3>

          {/* Specialization tags (hidden on mobile, show on sm+) */}
          {member.specializationKeys && (
            <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
              {member.specializationKeys.map((specKey) => {
                const fullKey = `members.${member.nameKey}.specializations.${specKey}` as Parameters<typeof t>[0];
                return (
                  <span
                    key={specKey}
                    className="rounded-full border border-gold/25 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold/85"
                  >
                    {t(fullKey)}
                  </span>
                );
              })}
            </div>
          )}

          {/* View profile — reveals on hover */}
          <div className="mt-2 hidden items-center gap-1.5 text-xs font-semibold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex">
            {t('viewProfile')}
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Gold top accent */}
        <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}

