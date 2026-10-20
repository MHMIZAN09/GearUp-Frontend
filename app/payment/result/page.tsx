import Link from 'next/link';
import { CheckCircle2, CircleAlert, Clock3, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type PaymentResultPageProps = {
  searchParams: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const params = await searchParams;
  const status = params.status?.toLowerCase();
  const isSuccess = status === 'success' || status === 'paid' || status === 'completed';
  const isPending = status === 'pending' || status === 'processing';
  const Icon = isSuccess ? CheckCircle2 : isPending ? Clock3 : XCircle;
  const title = isSuccess
    ? 'Payment successful'
    : isPending
      ? 'Payment is processing'
      : 'Payment was not completed';
  const description =
    params.message ??
    (isSuccess
      ? 'Your payment has been received. You can review the booking and transaction details below.'
      : isPending
        ? 'Your payment gateway response is being processed. Please check your payments shortly.'
        : 'The payment was cancelled or failed. You can return to your rentals and try again.');

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-lg overflow-hidden">
        <CardContent className="p-8 text-center sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-8" />
          </div>
          <Badge variant="secondary" className="mt-6 rounded-full">
            Payment update
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mx-auto mt-3 max-w-md leading-6 text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <Link href="/dashboard/payments">View my payments</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/dashboard/rentals">View rentals</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            {isSuccess ? <CheckCircle2 className="size-3.5" /> : <CircleAlert className="size-3.5" />}
            Keep this page for your payment status reference.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
