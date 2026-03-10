'use client';

import Image from 'next/image';
import { User } from 'lucide-react';

type AuthorBioProps = {
  name: string;
  image?: string;
};

const authorData: Record<string, { role: string; bio: string }> = {
  'Camelia Stan': {
    role: 'Avocat Fondator',
    bio: 'Avocat in Baroul Satu Mare cu experienta in malpraxis medical, drept civil si litigii complexe. Fondator al SCA Stan-Baculescu.',
  },
  'Vlad Baculescu': {
    role: 'Avocat Fondator',
    bio: 'Avocat in Baroul Satu Mare specializat in dreptul familiei, drept penal si proceduri de divort. Co-fondator al SCA Stan-Baculescu.',
  },
  'Diana Antonia Chincea': {
    role: 'Avocat Colaborator',
    bio: 'Avocat in Baroul Satu Mare cu experienta in dreptul muncii si drept comercial. Colaborator al SCA Stan-Baculescu.',
  },
  'Cristina Blan': {
    role: 'Avocat Colaborator',
    bio: 'Avocat in Baroul Satu Mare cu experienta in drept civil si contencios administrativ. Colaborator al SCA Stan-Baculescu.',
  },
  'Alexandra Rusu': {
    role: 'Avocat Colaborator',
    bio: 'Avocat in Baroul Satu Mare cu experienta in drept comercial si executare silita. Colaborator al SCA Stan-Baculescu.',
  },
  'Veress Gabriela Diana': {
    role: 'Relatii Clienti',
    bio: 'Responsabila de relatia cu clientii la SCA Stan-Baculescu, asigurand o comunicare eficienta si un serviciu de calitate.',
  },
};

export function AuthorBio({ name, image }: AuthorBioProps) {
  const data = authorData[name];

  if (!data) return null;

  return (
    <div
      className="mb-10 flex flex-col items-center gap-5 rounded-xl border border-navy/10 p-6 sm:flex-row sm:items-start"
      style={{
        background:
          'linear-gradient(135deg, rgba(0, 58, 112, 0.03), rgba(0, 58, 112, 0.06))',
      }}
    >
      {/* Avatar */}
      {image ? (
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top"
            sizes="72px"
          />
        </div>
      ) : (
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gold/20 ring-2 ring-gold/30">
          <User className="h-8 w-8 text-gold" />
        </div>
      )}

      {/* Info */}
      <div className="text-center sm:text-left">
        <h3 className="font-heading text-lg font-bold text-navy">{name}</h3>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
          {data.role}
        </p>
        <p className="text-sm leading-relaxed text-gray-700">{data.bio}</p>
      </div>
    </div>
  );
}
