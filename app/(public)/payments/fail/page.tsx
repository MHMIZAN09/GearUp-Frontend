import { ClipboardList, RotateCcw, XCircle } from 'lucide-react';

import { PaymentResult } from '../_components/payment-result';

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <PaymentResult
      actions={[
        { href: '/dashboard/rentals', label: 'Try again', icon: RotateCcw },
        { href: '/dashboard/rentals', label: 'View rentals', icon: ClipboardList },
      ]}
      description="We could not complete this payment. No successful charge was recorded for this attempt, and you can retry from your rentals dashboard."
      headline="Payment could not be processed"
      icon={XCircle}
      iconBackgroundClassName="bg-red-500/10"
      iconClassName="text-red-600 dark:text-red-400"
      orderId={orderId}
      statusDotClassName="bg-red-500"
      statusLabel="Failed"
      summary="The transaction did not go through. Please retry or choose another payment method."
      title="Payment failed"
    />
  );
}
