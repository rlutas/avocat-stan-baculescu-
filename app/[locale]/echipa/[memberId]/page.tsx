import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { LawIcon } from '@/components/icons';
import { MemberAnimatedSections } from '@/components/team/member-animated-sections';
import { BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://stanbaculescu.ro';

const validMemberIds = [
  'camelia-stan',
  'vlad-baculescu',
  'diana-chincea',
  'cristina-blan',
  'alexandra-rusu',
  'diana-veres',
];

const memberKeyMap: Record<string, string> = {
  'camelia-stan': 'cameliaStan',
  'vlad-baculescu': 'vladBaculescu',
  'diana-chincea': 'dianaChincea',
  'cristina-blan': 'cristinaBlan',
  'alexandra-rusu': 'alexandraRusu',
  'diana-veres': 'dianaVeres',
};

const memberRoleMap: Record<string, string> = {
  'camelia-stan': 'founder',
  'vlad-baculescu': 'founder',
  'diana-chincea': 'collaborator',
  'cristina-blan': 'collaborator',
  'alexandra-rusu': 'collaborator',
  'diana-veres': 'clientRelations',
};

const memberImageMap: Record<string, string> = {
  'camelia-stan': '/images/team/camelia-stan.webp',
  'vlad-baculescu': '/images/team/vlad-baculescu.webp',
  'diana-chincea': '/images/team/diana-chincea.webp',
  'cristina-blan': '/images/team/cristina-blan.webp',
  'alexandra-rusu': '/images/team/alexandra-rusu.webp',
  'diana-veres': '/images/team/diana-veres.webp',
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
      url: `${BASE_URL}/${locale}/echipa/${memberId}`,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/echipa/${memberId}`,
      languages: {
        'ro-RO': `${BASE_URL}/ro/echipa/${memberId}`,
        'en-US': `${BASE_URL}/en/echipa/${memberId}`,
        'x-default': `${BASE_URL}/ro/echipa/${memberId}`,
      },
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

  const name = t(`members.${memberKey}.name`);
  const shortBio = t(`members.${memberKey}.shortBio`);
  const fullBio = t(`members.${memberKey}.fullBio`);
  const roleLabel = t(`roles.${role}`);

  const bioLabel = t('profile.biography');
  const specializationsLabel = t('profile.specializations');
  const practiceAreasLabel = t('profile.practiceAreas');
  const educationLabel = t('profile.education');
  const experienceLabel = t('profile.experience');
  const contactLabel = t('profile.contactLabel');
  const contactTitle = t('profile.contactTitle');
  const contactDescription = t('profile.contactDescription');
  const barMemberLabel = t('profile.barMemberLabel');
  const yearsLabel = t('profile.yearsLabel');
  const phoneLabel = t('profile.phoneLabel');
  const emailLabel = t('profile.emailLabel');
  const pullQuoteKey = `members.${memberKey}.pullQuote` as Parameters<typeof t>[0];
  const pullQuote = t.has(pullQuoteKey) ? t(pullQuoteKey) : t('profile.pullQuote');
  const backLabel = t('backToTeam');
  const ctaButtonLabel = t('cta.button');

  // Member phone & email (optional per member)
  const phoneKey = `members.${memberKey}.phone` as Parameters<typeof t>[0];
  const emailKey = `members.${memberKey}.email` as Parameters<typeof t>[0];
  const barYearKey = `members.${memberKey}.barYear` as Parameters<typeof t>[0];
  const memberPhone = t.has(phoneKey) ? t(phoneKey) : '';
  const memberEmail = t.has(emailKey) ? t(emailKey) : '';
  const memberBarYear = t.has(barYearKey) ? t(barYearKey) : '';

  // Calculate years of experience from barYear
  const currentYear = new Date().getFullYear();
  const yearsExp = memberBarYear ? currentYear - parseInt(memberBarYear) : 0;

  // Specializations (up to 10)
  const specializations: string[] = [];
  const specializationSlugs: string[] = [];
  const specializationIcons: string[] = [];
  const specializationDescs: string[] = [];
  const specializationImages: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = `members.${memberKey}.specializations.spec${i}` as Parameters<typeof t>[0];
    if (t.has(key)) {
      specializations.push(t(key));
      const slugKey = `members.${memberKey}.specializations.spec${i}Slug` as Parameters<typeof t>[0];
      const iconKey = `members.${memberKey}.specializations.spec${i}Icon` as Parameters<typeof t>[0];
      const descKey = `members.${memberKey}.specializations.spec${i}Desc` as Parameters<typeof t>[0];
      const imageKey = `members.${memberKey}.specializations.spec${i}Image` as Parameters<typeof t>[0];
      const slug = t.has(slugKey) ? t(slugKey) : '';
      specializationSlugs.push(slug);
      specializationIcons.push(t.has(iconKey) ? t(iconKey) : '');
      specializationDescs.push(t.has(descKey) ? t(descKey) : '');
      // Image: use slug-derived path if available, otherwise check for explicit image key
      specializationImages.push(
        slug ? `/images/services/${slug}.webp` : (t.has(imageKey) ? t(imageKey) : '')
      );
    }
  }

  const viewDetailsLabel = t('profile.viewDetails');

  // Education (up to 3)
  const education: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const key = `members.${memberKey}.education.edu${i}` as Parameters<typeof t>[0];
    if (t.has(key)) {
      education.push(t(key));
    }
  }

  // Experience (up to 5)
  const experience: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = `members.${memberKey}.experience.exp${i}` as Parameters<typeof t>[0];
    if (t.has(key)) {
      experience.push(t(key));
    }
  }

  // LinkedIn, YouTube, Press (optional per member)
  const linkedinKey = `members.${memberKey}.linkedin` as Parameters<typeof t>[0];
  const youtubeVideoKey = `members.${memberKey}.youtubeVideo` as Parameters<typeof t>[0];
  const youtubeTitleKey = `members.${memberKey}.youtubeTitle` as Parameters<typeof t>[0];
  const linkedin = t.has(linkedinKey) ? t(linkedinKey) : '';
  const youtubeVideo = t.has(youtubeVideoKey) ? t(youtubeVideoKey) : '';
  const youtubeTitle = t.has(youtubeTitleKey) ? t(youtubeTitleKey) : '';

  // Press items (up to 10)
  const pressItems: { title: string; source: string; url: string }[] = [];
  for (let i = 1; i <= 10; i++) {
    const titleKey = `members.${memberKey}.press.item${i}Title` as Parameters<typeof t>[0];
    if (t.has(titleKey)) {
      const sourceKey = `members.${memberKey}.press.item${i}Source` as Parameters<typeof t>[0];
      const urlKey = `members.${memberKey}.press.item${i}Url` as Parameters<typeof t>[0];
      pressItems.push({
        title: t(titleKey),
        source: t.has(sourceKey) ? t(sourceKey) : '',
        url: t.has(urlKey) ? t(urlKey) : '',
      });
    }
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/${locale}/echipa/${memberId}#person`,
    name,
    jobTitle: roleLabel,
    description: shortBio,
    image: `${BASE_URL}${memberImageMap[memberId]}`,
    url: `${BASE_URL}/${locale}/echipa/${memberId}`,
    telephone: memberPhone || undefined,
    email: memberEmail || undefined,
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Baroul Satu Mare',
    },
    knowsAbout: specializations.length > 0 ? specializations : undefined,
    alumniOf: education.length > 0
      ? education.map((edu: string) => ({
          '@type': 'EducationalOrganization',
          name: edu,
        }))
      : undefined,
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: locale === 'ro' ? 'Acasă' : 'Home', url: `https://stanbaculescu.ro/${locale}` },
          { name: locale === 'ro' ? 'Echipă' : 'Team', url: `https://stanbaculescu.ro/${locale}/echipa` },
          { name },
        ]}
      />
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#002a52_0%,#003a70_50%,#004a8f_100%)] pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Gold radial glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-60"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(208,156,17,0.14) 0%, rgba(208,156,17,0.04) 50%, transparent 70%)',
          }}
        />

        {/* Secondary glow bottom-left */}
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 opacity-40"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(208,156,17,0.1) 0%, transparent 60%)',
          }}
        />

        {/* Gold shimmer top bar */}
        <div className="absolute left-0 right-0 top-0 h-[2px] animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,transparent_0%,#d09c11_25%,#e6b520_50%,#d09c11_75%,transparent_100%)]" />

        {/* Noise grain texture */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-soft-light" aria-hidden="true">
          <filter id="memberHeroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#memberHeroNoise)" />
        </svg>

        {/* Animated gold line art */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
          <path
            d="M-50 800 Q350 400 700 500 T1450 100"
            stroke="rgba(208, 156, 17, 0.10)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ animation: 'lineDrawIn 3s ease-in-out 1.2s both' }}
          />
          <path
            d="M-50 830 Q350 430 700 530 T1450 130"
            stroke="rgba(208, 156, 17, 0.05)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ animation: 'lineDrawIn 3.5s ease-in-out 1.5s both' }}
          />
        </svg>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/echipa"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-300 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {backLabel}
          </Link>

          {/* Split layout */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">

            {/* Photo column with gold frame effect and floating badges */}
            <div
              className="mx-auto w-full max-w-xs flex-shrink-0 lg:mx-0 lg:w-[360px]"
              style={{ animation: 'heroFadeLeft 0.9s ease-out 0.1s both' }}
            >
              <div className="relative">
                {/* Decorative gold corner frame — top-left */}
                <div className="absolute -left-3 -top-3 z-10 h-16 w-16">
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-gold/50" />
                  <div className="absolute left-0 top-0 h-[2px] w-full bg-gold/50" />
                </div>
                {/* Decorative gold corner frame — bottom-right */}
                <div className="absolute -bottom-3 -right-3 z-10 h-16 w-16">
                  <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gold/50" />
                  <div className="absolute bottom-0 right-0 h-[2px] w-full bg-gold/50" />
                </div>

                {/* Main photo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <Image
                    src={memberImageMap[memberId]}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 80vw, 360px"
                    priority
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/70 via-navy/30 to-transparent" />
                </div>

                {/* Floating stat badge — years of experience (top-right) */}
                {yearsExp > 0 && (
                  <div
                    className="absolute -right-4 -top-6 z-20 rounded-xl border border-white/10 bg-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:-right-8 sm:-top-7"
                    style={{ animation: 'heroBadgePop 0.6s ease-out 0.7s both' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
                        <LawIcon name="medal" size={22} variant="gold" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">{yearsLabel}</p>
                        <p className="font-heading text-lg font-bold text-white">{yearsExp}+</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating stat badge — bar member (bottom-left) */}
                {memberBarYear && (
                  <div
                    className="absolute -bottom-6 -left-4 z-20 rounded-xl border border-white/10 bg-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:-bottom-7 sm:-left-8"
                    style={{ animation: 'heroBadgePop 0.6s ease-out 0.9s both' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
                        <LawIcon name="certificate" size={22} variant="gold" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">{barMemberLabel}</p>
                        <p className="font-heading text-lg font-bold text-white">{memberBarYear}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info column */}
            <div
              className="flex-1"
              style={{ animation: 'heroFadeRight 0.9s ease-out 0.2s both' }}
            >
              {/* Role badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {roleLabel}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-heading mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {name}
              </h1>

              {/* Gold bar */}
              <div className="mb-6 h-[2px] w-14 bg-gold" />

              {/* Short bio */}
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/70">
                {shortBio}
              </p>

              {/* Specialization pills (first 4) */}
              {specializations.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {specializations.slice(0, 4).map((spec, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-white/80"
                    >
                      {spec}
                    </span>
                  ))}
                  {specializations.length > 4 && (
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
                      +{specializations.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Contact pills — phone and email */}
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                {memberPhone && (
                  <a
                    href={`tel:${memberPhone.replace(/\s/g, '')}`}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 transition-all duration-300 hover:border-gold/30 hover:bg-gold/10"
                  >
                    <Phone className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-gold">{memberPhone}</span>
                  </a>
                )}
                {memberEmail && (
                  <a
                    href={`mailto:${memberEmail}`}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 transition-all duration-300 hover:border-gold/30 hover:bg-gold/10"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-gold">{memberEmail}</span>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 transition-all duration-300 hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/15"
                  >
                    <Linkedin className="h-4 w-4 text-[#0a66c2]" />
                    <span className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-[#0a66c2]">LinkedIn</span>
                    <ExternalLink className="h-3 w-3 text-white/40 transition-colors duration-300 group-hover:text-[#0a66c2]" />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes heroFadeLeft {
            from { opacity: 0; transform: translateX(-32px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroFadeRight {
            from { opacity: 0; transform: translateX(32px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroBadgePop {
            from { opacity: 0; transform: scale(0.85) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes lineDrawIn {
            from {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              opacity: 0;
            }
            to {
              stroke-dasharray: 2000;
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
        `}} />
      </section>

      {/* ── Animated body sections (client component) ── */}
      <MemberAnimatedSections
        fullBio={fullBio}
        specializations={specializations}
        specializationSlugs={specializationSlugs}
        specializationIcons={specializationIcons}
        specializationDescs={specializationDescs}
        specializationImages={specializationImages}
        education={education}
        experience={experience}
        bioLabel={bioLabel}
        specializationsLabel={specializationsLabel}
        practiceAreasLabel={practiceAreasLabel}
        educationLabel={educationLabel}
        experienceLabel={experienceLabel}
        contactLabel={contactLabel}
        contactTitle={contactTitle}
        contactDescription={contactDescription}
        ctaButtonLabel={ctaButtonLabel}
        memberPhone={memberPhone}
        memberEmail={memberEmail}
        memberName={name}
        memberImage={memberImageMap[memberId]}
        pullQuote={pullQuote}
        phoneLabel={phoneLabel}
        emailLabel={emailLabel}
        viewDetailsLabel={viewDetailsLabel}
        linkedin={linkedin || undefined}
        youtubeVideo={youtubeVideo || undefined}
        youtubeTitle={youtubeTitle || undefined}
        pressItems={pressItems.length > 0 ? pressItems : undefined}
        pressLabel={locale === 'ro' ? 'In Presa' : 'In the Press'}
        videoLabel={locale === 'ro' ? 'Video' : 'Video'}
      />
    </main>
  );
}
