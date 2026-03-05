'use client';

type LegalCitationProps = {
  source?: string;
  children: React.ReactNode;
};

export function LegalCitation({ source, children }: LegalCitationProps) {
  return (
    <div className="legal-citation">
      {children}
      {source && <div className="legal-citation-source">{source}</div>}
    </div>
  );
}
