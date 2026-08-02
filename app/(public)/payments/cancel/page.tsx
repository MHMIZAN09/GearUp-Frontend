import { AlertTriangle, ClipboardList, RotateCcw } from 'lucide-react';

import { PaymentResult } from '../_components/payment-result';

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <PaymentResult
      actions={[
        { href: '/dashboard/rentals', label: 'Resume payment', icon: RotateCcw },
        { href: '/dashboard/rentals', label: 'Back to rentals', icon: ClipboardList },
      ]}
      description="You cancelled the payment before it was completed. Your rental request is still available, and you can resume payment from your rentals dashboard."
      headline="Payment was cancelled"
      icon={AlertTriangle}
      iconBackgroundClassName="bg-amber-500/10"
      iconClassName="text-amber-600 dark:text-amber-400"
      orderId={orderId}
      statusDotClassName="bg-amber-500"
      statusLabel="Cancelled"
      summary="No payment was completed for this order. Your rental remains pending until payment is made."
      title="Payment cancelled"
    />
  );
}
