'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimate, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animate';

const founders = [
  {
    id: 'camelia-stan',
    nameKey: 'cameliaStan',
    image: '/images/team/camelia-stan.webp',
  },
  {
    id: 'vlad-baculescu',
    nameKey: 'vladBaculescu',
    image: '/images/team/vlad-baculescu.webp',
  },
];

const collaborators = [
  {
    id: 'diana-chincea',
    nameKey: 'dianaChincea',
    image: '/images/team/diana-chincea.webp',
    roleKey: 'collaborator' as const,
  },
  {
    id: 'cristina-blan',
    nameKey: 'cristinaBlan',
    image: '/images/team/cristina-blan.webp',
    roleKey: 'collaborator' as const,
  },
  {
    id: 'alexandra-rusu',
    nameKey: 'alexandraRusu',
    image: '/images/team/alexandra-rusu.webp',
    roleKey: 'collaborator' as const,
  },
  {
    id: 'diana-veres',
    nameKey: 'dianaVeres',
    image: '/images/team/diana-veres.webp',
    roleKey: 'clientRelations' as const,
  },
];

export function HomeTeam() {
  const t = useTranslations('HomePage.team');
  const tMembers = useTranslations('TeamPage.members');
  const tRoles = useTranslations('TeamPage.roles');

  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <ScrollAnimate>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {t('titleLine1')}
              </p>
            </ScrollAnimate>
            <ScrollAnimate delay={0.1}>
              <h2 className="font-heading text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
                {t('titleLine2')}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-gold" />
            </ScrollAnimate>
            <ScrollAnimate delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                {t('description')}
              </p>
            </ScrollAnimate>
          </div>
          <ScrollAnimate delay={0.3} className="flex-shrink-0">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full border-2 border-navy bg-transparent px-8 text-base font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white"
            >
              <Link href="/echipa">
                {t('viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </ScrollAnimate>
        </div>

        {/* Founders */}
        <StaggerContainer className="mb-6 grid gap-6 sm:grid-cols-2 lg:gap-8" staggerDelay={0.15}>
          {founders.map((founder) => (
            <StaggerItem key={founder.id} variant="scaleUp">
              <Link
                href={`/echipa/${founder.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-navy">
                  <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                    <Image
                      src={founder.image}
                      alt={tMembers(`${founder.nameKey}.name`)}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                      {tRoles('founder')}
                    </span>
                    <h3 className="mb-2 font-heading text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                      {tMembers(`${founder.nameKey}.name`)}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/70 sm:text-base">
                      {tMembers(`${founder.nameKey}.shortBio`)}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {t('viewProfile')}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Collaborators */}
        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6 lg:gap-8" staggerDelay={0.1}>
          {collaborators.map((member) => (
            <StaggerItem key={member.id} variant="scaleUp">
              <Link
                href={`/echipa/${member.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl bg-navy sm:rounded-2xl">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.image}
                      alt={tMembers(`${member.nameKey}.name`)}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 33vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                    <span className="mb-1 hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-gold sm:block">
                      {tRoles(member.roleKey)}
                    </span>
                    <h3 className="font-heading text-sm font-bold text-white transition-colors duration-300 group-hover:text-gold sm:text-lg">
                      {tMembers(`${member.nameKey}.name`)}
                    </h3>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
