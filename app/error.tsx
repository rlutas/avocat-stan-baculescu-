'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-gold" />
        <h2 className="mt-4 text-2xl font-bold text-navy">
          Ceva nu a funcționat corect
        </h2>
        <p className="mt-2 text-gray-600">
          Ne pare rău, a apărut o eroare. Vă rugăm încercați din nou.
        </p>
        <Button
          onClick={reset}
          className="mt-6 bg-gold hover:bg-gold-light text-navy"
        >
          Încercați din nou
        </Button>
      </div>
    </div>
  );
}
