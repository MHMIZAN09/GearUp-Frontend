import { CheckCircle2, ClipboardList, ShoppingBag } from 'lucide-react';

import { PaymentResult } from '../_components/payment-result';

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <PaymentResult
      actions={[
        { href: '/dashboard/rentals', label: 'View rentals', icon: ClipboardList },
        { href: '/gear', label: 'Rent more gear', icon: ShoppingBag },
      ]}
      description="Your rental payment has been confirmed. We have updated your order and your booking is ready to track from your rentals dashboard."
      headline="Payment completed successfully"
      icon={CheckCircle2}
      iconBackgroundClassName="bg-emerald-500/10"
      iconClassName="text-emerald-600 dark:text-emerald-400"
      orderId={orderId}
      statusDotClassName="bg-emerald-500"
      statusLabel="Paid"
      summary="Your payment was received and the rental order is now active."
      title="Payment successful"
    />
  );
}
