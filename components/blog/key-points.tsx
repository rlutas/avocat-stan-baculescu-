'use client';

import { Scale } from 'lucide-react';

type KeyPointsProps = {
  children: React.ReactNode;
};

export function KeyPoints({ children }: KeyPointsProps) {
  return (
    <div className="key-points">
      <div className="key-points-title">
        <Scale className="h-5 w-5" />
        Puncte Cheie
      </div>
      {children}
    </div>
  );
}
