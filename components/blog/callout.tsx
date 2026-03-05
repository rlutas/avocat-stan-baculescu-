'use client';

import { Info, AlertTriangle } from 'lucide-react';

type CalloutProps = {
  type: 'info' | 'warning';
  title?: string;
  children: React.ReactNode;
};

const defaults = {
  info: { title: 'Informatie', Icon: Info },
  warning: { title: 'Atentie', Icon: AlertTriangle },
};

export function Callout({ type, title, children }: CalloutProps) {
  const { title: defaultTitle, Icon } = defaults[type];

  return (
    <div className={type === 'warning' ? 'callout-warning' : 'callout-info'}>
      <div className="callout-title">
        <Icon className="h-5 w-5" />
        {title || defaultTitle}
      </div>
      {children}
    </div>
  );
}
