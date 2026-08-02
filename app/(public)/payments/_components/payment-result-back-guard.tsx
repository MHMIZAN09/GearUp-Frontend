'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type PaymentResultBackGuardProps = {
  fallbackHref?: string;
};

export function PaymentResultBackGuard({
  fallbackHref = '/dashboard/rentals',
}: PaymentResultBackGuardProps) {
  const router = useRouter();

  useEffect(() => {
    window.history.pushState({ paymentResult: true }, '', window.location.href);

    const handleBack = () => {
      router.replace(fallbackHref);
    };

    window.addEventListener('popstate', handleBack);

    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [fallbackHref, router]);

  return null;
}
