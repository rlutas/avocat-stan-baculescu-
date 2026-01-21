'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

type TeamMember = {
  id: string;
  nameKey: string;
  roleKey: string;
  image: string;
  category: 'founder' | 'collaborator' | 'staff';
};

const teamMembers: TeamMember[] = [
  {
    id: 'camelia-stan',
    nameKey: 'cameliaStan',
    roleKey: 'founder',
    image: '/images/team/camelia-stan.png',
    category: 'founder',
  },
  {
    id: 'vlad-baculescu',
    nameKey: 'vladBaculescu',
    roleKey: 'founder',
    image: '/images/team/vlad-baculescu.png',
    category: 'founder',
  },
  {
    id: 'diana-chincea',
    nameKey: 'dianaChincea',
    roleKey: 'collaborator',
    image: '/images/team/diana-chincea.png',
    category: 'collaborator',
  },
  {
    id: 'gabriela-tarta',
    nameKey: 'gabrielaTarta',
    roleKey: 'collaborator',
    image: '/images/team/gabriela-tarta.png',
    category: 'collaborator',
  },
  {
    id: 'alexandra-rusu',
    nameKey: 'alexandraRusu',
    roleKey: 'collaborator',
    image: '/images/team/alexandra-rusu.png',
    category: 'collaborator',
  },
  {
    id: 'cristina-tentes',
    nameKey: 'cristinaTentes',
    roleKey: 'clientRelations',
    image: '/images/team/cristina-tentes.png',
    category: 'staff',
  },
];

export function TeamGrid() {
  const t = useTranslations('TeamPage');

  const founders = teamMembers.filter((m) => m.category === 'founder');
  const collaborators = teamMembers.filter((m) => m.category === 'collaborator');
  const staff = teamMembers.filter((m) => m.category === 'staff');

  return (
    <section className="py-16 sm:py-24">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes photoFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Founders Section */}
        <div className="mb-20">
          <div
            className="mb-12 text-center"
            style={{ animation: 'fadeInUp 1s ease-out both' }}
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Conducere
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t('sections.founders')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {founders.map((member, index) => (
              <TeamCard key={member.id} member={member} t={t} variant="gold" index={index} />
            ))}
          </div>
        </div>

        {/* Collaborators Section */}
        <div className="mb-20">
          <div
            className="mb-12 text-center"
            style={{ animation: 'fadeInUp 1s ease-out 200ms both' }}
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Echipa
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t('sections.collaborators')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {collaborators.map((member, index) => (
              <TeamCard key={member.id} member={member} t={t} variant="navy" index={index + 2} />
            ))}
          </div>
        </div>

        {/* Staff Section */}
        <div>
          <div
            className="mb-12 text-center"
            style={{ animation: 'fadeInUp 1s ease-out 400ms both' }}
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              Suport
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              {t('sections.staff')}
            </h2>
          </div>
          <div className="mx-auto max-w-2xl">
            {staff.map((member, index) => (
              <TeamCard key={member.id} member={member} t={t} variant="light" index={index + 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Universal Team Card with variant support and animations
function TeamCard({
  member,
  t,
  variant,
  index,
}: {
  member: TeamMember;
  t: ReturnType<typeof useTranslations<'TeamPage'>>;
  variant: 'gold' | 'navy' | 'light';
  index: number;
}) {
  const isGold = variant === 'gold';
  const isNavy = variant === 'navy';
  const isLight = variant === 'light';

  // Colors based on variant
  const accentColor = isGold ? 'bg-gold' : isLight ? 'bg-gray-300' : 'bg-navy';
  const bgGradient = isGold
    ? 'bg-gradient-to-br from-[#fdf6e3] via-[#fef9ed] to-[#fffbf5]'
    : isLight
    ? 'bg-gradient-to-br from-[#f0f5fa] via-[#f5f8fc] to-[#f8fafc]'
    : 'bg-gradient-to-br from-[#e3ecf4] via-[#edf3f9] to-[#f5f9fc]';
  const badgeBg = isGold
    ? 'bg-gold/10 text-gold'
    : isLight
    ? 'bg-gray-100 text-gray-600'
    : 'bg-navy/10 text-navy';
  const hoverColor = isGold
    ? 'group-hover:text-gold'
    : isLight
    ? 'group-hover:text-gray-600'
    : 'group-hover:text-gold';

  return (
    <Link
      href={`/echipa/${member.id}`}
      className="group block"
      style={{ animation: `photoFadeIn 1s ease-out ${index * 100}ms both` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-gold/60">
        {/* Accent line on top with animation */}
        <div className={`absolute left-0 right-0 top-0 z-10 h-1 origin-left scale-x-0 ${accentColor} transition-transform duration-300 group-hover:scale-x-100`} />

        <div className="flex flex-col sm:flex-row">
          {/* Image Section with shimmer effect */}
          <div className="relative sm:w-2/5">
            <div className={`relative h-64 w-full overflow-hidden sm:h-full sm:min-h-[280px] ${bgGradient}`}>
              {/* Shimmer effect */}
              <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]"
                  style={{ animation: 'shimmer 2s infinite' }}
                />
              </div>

              {/* Image positioned to be flush with left, bottom, and fill horizontally */}
              <div className="absolute bottom-0 left-0 right-0 top-0">
                <Image
                  src={member.image}
                  alt={t(`members.${member.nameKey}.name`)}
                  fill
                  className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-6 sm:w-3/5 sm:p-8">
            <div className="mb-3">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badgeBg}`}>
                {t(`roles.${member.roleKey}`)}
              </span>
            </div>

            <h3 className={`mb-3 font-heading text-2xl font-bold text-navy transition-colors duration-300 ${hoverColor}`}>
              {t(`members.${member.nameKey}.name`)}
            </h3>

            <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-text-secondary">
              {t(`members.${member.nameKey}.shortBio`)}
            </p>

            <div className={`mt-auto flex items-center text-sm font-medium text-navy transition-colors duration-300 ${hoverColor}`}>
              <span>{t('viewProfile')}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
