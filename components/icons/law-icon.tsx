import Image from 'next/image';
import { cn } from '@/lib/utils';

export type LawIconName =
  | 'justice'
  | 'balance-scale'
  | 'gavel'
  | 'family'
  | 'suitcase'
  | 'contract'
  | 'police-car'
  | 'document'
  | 'certificate'
  | 'shield'
  | 'medal'
  | 'target'
  | 'shield-badge'
  | 'diploma'
  | 'conference'
  | 'law-book'
  | 'detective'
  | 'approval'
  | 'attorney'
  | 'court'
  | 'judge'
  | 'lawyer';

const iconFileMap: Record<LawIconName, string> = {
  justice: '/icons/018-justice.svg',
  'balance-scale': '/icons/002-balance-scale.svg',
  gavel: '/icons/014-gavel.svg',
  family: '/icons/009-family.svg',
  suitcase: '/icons/020-suitcase.svg',
  contract: '/icons/006-contract.svg',
  'police-car': '/icons/024-police-car.svg',
  document: '/icons/023-document.svg',
  certificate: '/icons/004-certificate.svg',
  shield: '/icons/028-shield.svg',
  medal: '/icons/013-medal.svg',
  target: '/icons/017-target.svg',
  'shield-badge': '/icons/015-shield.svg',
  diploma: '/icons/010-certificate.svg',
  conference: '/icons/005-conference.svg',
  'law-book': '/icons/019-law-book.svg',
  detective: '/icons/010-detective.svg',
  approval: '/icons/002-approval.svg',
  attorney: '/icons/001-attorney.svg',
  court: '/icons/007-court.svg',
  judge: '/icons/016-judge.svg',
  lawyer: '/icons/021-lawyer.svg',
};

// Service slug to icon name mapping
export const serviceIconMap: Record<string, LawIconName> = {
  'malpraxis-medical': 'justice',
  'drept-civil': 'balance-scale',
  'drept-penal': 'gavel',
  'drept-familiei': 'family',
  'dreptul-muncii': 'suitcase',
  'drept-comercial': 'contract',
  'accidente-rutiere': 'police-car',
  'drept-administrativ-fiscal': 'document',
};

interface LawIconProps {
  name: LawIconName;
  size?: number;
  className?: string;
  variant?: 'gold' | 'navy' | 'white' | 'default';
}

export function LawIcon({ name, size = 48, className, variant = 'default' }: LawIconProps) {
  const variantClass = {
    gold: 'icon-gold',
    navy: 'icon-navy',
    white: 'icon-white',
    default: '',
  }[variant];

  return (
    <Image
      src={iconFileMap[name]}
      alt=""
      width={size}
      height={size}
      className={cn(variantClass, className)}
      aria-hidden="true"
    />
  );
}
