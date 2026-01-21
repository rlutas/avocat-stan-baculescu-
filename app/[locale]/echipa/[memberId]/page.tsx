import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';

const validMemberIds = [
  'camelia-stan',
  'vlad-baculescu',
  'diana-chincea',
  'gabriela-tarta',
  'alexandra-rusu',
  'cristina-tentes',
];

const memberKeyMap: Record<string, string> = {
  'camelia-stan': 'cameliaStan',
  'vlad-baculescu': 'vladBaculescu',
  'diana-chincea': 'dianaChincea',
  'gabriela-tarta': 'gabrielaTarta',
  'alexandra-rusu': 'alexandraRusu',
  'cristina-tentes': 'cristinaTentes',
};

const memberRoleMap: Record<string, string> = {
  'camelia-stan': 'founder',
  'vlad-baculescu': 'founder',
  'diana-chincea': 'collaborator',
  'gabriela-tarta': 'collaborator',
  'alexandra-rusu': 'collaborator',
  'cristina-tentes': 'clientRelations',
};

type Props = {
  params: Promise<{ locale: string; memberId: string }>;
};

export async function generateStaticParams() {
  return validMemberIds.map((memberId) => ({ memberId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, memberId } = await params;

  if (!validMemberIds.includes(memberId)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'TeamPage' });
  const memberKey = memberKeyMap[memberId];
  const name = t(`members.${memberKey}.name`);
  const role = t(`roles.${memberRoleMap[memberId]}`);

  const title =
    locale === 'ro'
      ? `${name} - ${role} | Cabinet de Avocatura Stan-Baculescu`
      : `${name} - ${role} | Stan-Baculescu Law Firm`;
  const description =
    locale === 'ro'
      ? `Descopera profilul profesional al ${name}, ${role.toLowerCase()} la Cabinetul de Avocatura Stan-Baculescu din Satu Mare.`
      : `Discover the professional profile of ${name}, ${role.toLowerCase()} at Stan-Baculescu Law Firm in Satu Mare.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
    },
  };
}

export default async function MemberProfilePage({ params }: Props) {
  const { locale, memberId } = await params;
  setRequestLocale(locale);

  if (!validMemberIds.includes(memberId)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'TeamPage' });
  const memberKey = memberKeyMap[memberId];
  const role = memberRoleMap[memberId];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.04)_75%,rgba(255,255,255,0.04)_76%,transparent_77%)] bg-[length:50px_50px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/echipa"
            className="mb-8 inline-flex items-center text-sm font-medium text-slate-300 transition-colors hover:text-amber-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToTeam')}
          </Link>

          <div className="lg:flex lg:items-center lg:gap-12">
            {/* Profile Image */}
            <div className="mb-8 lg:mb-0 lg:w-1/3">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-700 shadow-2xl">
                <Image
                  src={`/images/team/${memberId}.jpg`}
                  alt={t(`members.${memberKey}.name`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:w-2/3">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-500">
                {t(`roles.${role}`)}
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {t(`members.${memberKey}.name`)}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-slate-300">
                {t(`members.${memberKey}.shortBio`)}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="default"
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    {t('contactMember')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Biography Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('profile.biography')}
          </h2>
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="leading-relaxed text-slate-600">
              {t(`members.${memberKey}.fullBio`)}
            </p>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('profile.specializations')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => {
              const specKey = `members.${memberKey}.specializations.spec${i}` as const;
              const specValue = t.has(specKey) ? t(specKey) : null;
              if (!specValue) return null;
              return (
                <div
                  key={i}
                  className="flex items-center rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="font-medium text-slate-900">{specValue}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education */}
            <div>
              <h2 className="mb-6 flex items-center text-2xl font-bold text-slate-900">
                <GraduationCap className="mr-3 h-6 w-6 text-amber-500" />
                {t('profile.education')}
              </h2>
              <div className="space-y-4">
                {[1, 2].map((i) => {
                  const eduKey = `members.${memberKey}.education.edu${i}` as const;
                  const eduValue = t.has(eduKey) ? t(eduKey) : null;
                  if (!eduValue) return null;
                  return (
                    <div key={i} className="rounded-lg bg-slate-50 p-4">
                      <p className="text-slate-700">{eduValue}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="mb-6 flex items-center text-2xl font-bold text-slate-900">
                <Award className="mr-3 h-6 w-6 text-amber-500" />
                {t('profile.experience')}
              </h2>
              <div className="space-y-4">
                {[1, 2].map((i) => {
                  const expKey = `members.${memberKey}.experience.exp${i}` as const;
                  const expValue = t.has(expKey) ? t(expKey) : null;
                  if (!expValue) return null;
                  return (
                    <div key={i} className="rounded-lg bg-slate-50 p-4">
                      <p className="text-slate-700">{expValue}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t('profile.contactTitle')}
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            {t('profile.contactDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-slate-300">
              <Phone className="mr-2 h-5 w-5 text-amber-500" />
              <span>+40 261-848-015</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Mail className="mr-2 h-5 w-5 text-amber-500" />
              <span>office@stanbaculescu.ro</span>
            </div>
            <div className="flex items-center text-slate-300">
              <MapPin className="mr-2 h-5 w-5 text-amber-500" />
              <span>Str. Aurel Popp 2, Satu Mare</span>
            </div>
          </div>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600"
            >
              <Link href="/contact">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
