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
    image: '/images/team/camelia-stan.jpg',
    category: 'founder',
  },
  {
    id: 'vlad-baculescu',
    nameKey: 'vladBaculescu',
    roleKey: 'founder',
    image: '/images/team/vlad-baculescu.jpg',
    category: 'founder',
  },
  {
    id: 'diana-chincea',
    nameKey: 'dianaChincea',
    roleKey: 'collaborator',
    image: '/images/team/diana-chincea.jpg',
    category: 'collaborator',
  },
  {
    id: 'gabriela-tarta',
    nameKey: 'gabrielaTarta',
    roleKey: 'collaborator',
    image: '/images/team/gabriela-tarta.jpg',
    category: 'collaborator',
  },
  {
    id: 'alexandra-rusu',
    nameKey: 'alexandraRusu',
    roleKey: 'collaborator',
    image: '/images/team/alexandra-rusu.jpg',
    category: 'collaborator',
  },
  {
    id: 'cristina-tentes',
    nameKey: 'cristinaTentes',
    roleKey: 'clientRelations',
    image: '/images/team/cristina-tentes.jpg',
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Founders Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('sections.founders')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
            {founders.map((member) => (
              <TeamCard key={member.id} member={member} t={t} featured />
            ))}
          </div>
        </div>

        {/* Collaborators Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('sections.collaborators')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {collaborators.map((member) => (
              <TeamCard key={member.id} member={member} t={t} />
            ))}
          </div>
        </div>

        {/* Staff Section */}
        <div>
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('sections.staff')}
          </h2>
          <div className="mx-auto max-w-md">
            {staff.map((member) => (
              <TeamCard key={member.id} member={member} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  t,
  featured = false,
}: {
  member: TeamMember;
  t: ReturnType<typeof useTranslations<'TeamPage'>>;
  featured?: boolean;
}) {
  return (
    <Link href={`/echipa/${member.id}`} className="group block">
      <div
        className={`overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
          featured ? 'lg:flex' : ''
        }`}
      >
        <div className={`relative ${featured ? 'lg:w-2/5' : ''}`}>
          <div
            className={`relative ${featured ? 'h-80 lg:h-full' : 'h-72'} w-full bg-slate-200`}
          >
            <Image
              src={member.image}
              alt={t(`members.${member.nameKey}.name`)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={featured ? '(max-width: 1024px) 100vw, 40vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </div>
        </div>
        <div className={`p-6 ${featured ? 'lg:flex lg:w-3/5 lg:flex-col lg:justify-center lg:p-8' : ''}`}>
          <h3 className="mb-1 text-xl font-semibold text-slate-900 transition-colors group-hover:text-amber-600">
            {t(`members.${member.nameKey}.name`)}
          </h3>
          <p className="mb-3 text-sm font-medium text-amber-600">
            {t(`roles.${member.roleKey}`)}
          </p>
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {t(`members.${member.nameKey}.shortBio`)}
          </p>
          <div className="flex items-center text-sm font-medium text-slate-900 transition-colors group-hover:text-amber-600">
            {t('viewProfile')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
