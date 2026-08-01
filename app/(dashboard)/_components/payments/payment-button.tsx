'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { createPayment } from '../../_actions/payments.actions';

type Props = {
  rentalOrderId: string;
};

export default function PaymentButton({ rentalOrderId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const result = await createPayment({
          rentalOrderId,
        });
        console.log('Payment initiation result:', result);
        if (!result?.success) {
          toast.error(result?.message || 'Failed to initiate payment.');
          return;
        }

        const paymentUrl = result?.data?.GetWayURL;

        if (!paymentUrl) {
          toast.error('Payment gateway URL not found.');
          return;
        }

        toast.success('Redirecting to payment gateway...');

        // Redirect to SSLCommerz
        window.location.assign(paymentUrl);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Button onClick={handlePayment} disabled={isPending} className="rounded-full">
      {isPending ? 'Redirecting...' : 'Pay Now'}
    </Button>
  );
}
