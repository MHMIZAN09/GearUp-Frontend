import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Hash,
  ReceiptText,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { getPaymentById } from '../../../_actions/payments.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PaymentDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const getPayment = (data: unknown) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const record = data as Record<string, unknown>;
  const nestedData = record.data;

  if (nestedData && typeof nestedData === 'object' && !Array.isArray(nestedData)) {
    return nestedData as Record<string, unknown>;
  }

  return record;
};

const getStatusVariant = (status: string) => {
  if (['PAID', 'SUCCESS', 'COMPLETED'].includes(status)) {
    return 'default' as const;
  }

  if (['FAILED', 'CANCELLED', 'CANCELED'].includes(status)) {
    return 'destructive' as const;
  }

  return 'secondary' as const;
};

const formatDate = (value: unknown) => {
  if (typeof value !== 'string' || !value) {
    return 'Not available';
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleString();
};

export default async function CustomerPaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { id } = await params;
  const result = await getPaymentById(id);
  const payment = result.success ? getPayment(result.data) : null;

  if (!payment) {
    return (
      <div className="rounded-3xl border border-dashed px-6 py-16 text-center">
        <ReceiptText className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Payment details unavailable</h1>
        <p className="mt-2 text-muted-foreground">
          {result.message ?? 'We could not load this payment record.'}
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/dashboard/payments">Back to payments</Link>
        </Button>
      </div>
    );
  }

  const status = String(payment.status ?? 'UNKNOWN').toUpperCase();
  const isSuccessful = ['PAID', 'SUCCESS', 'COMPLETED'].includes(status);
  const StatusIcon = isSuccessful ? CheckCircle2 : XCircle;
  const amount = Number(payment.amount ?? 0);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-8">
        <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3 rounded-full">
              Payment details
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">Transaction summary</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Review the amount, transaction reference, and booking connected to this payment.
            </p>
          </div>
          <Badge variant={getStatusVariant(status)} className="w-fit rounded-full px-3 py-1">
            <StatusIcon className="mr-1.5 size-3.5" />
            {status}
          </Badge>
        </div>
      </section>

      <Button asChild variant="outline" className="rounded-full">
        <Link href="/dashboard/payments">
          <ArrowLeft className="size-4" />
          Back to payments
        </Link>
      </Button>

      <Card className="overflow-hidden rounded-3xl">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">Payment information</CardTitle>
          <p className="break-all text-sm text-muted-foreground">
            Payment ID: {String(payment.id ?? id)}
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border bg-primary/5 p-4">
            <CreditCard className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="mt-1 text-2xl font-bold">৳{amount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <Hash className="mt-0.5 size-5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="mt-1 break-all font-mono text-sm font-semibold">
                {String(payment.transactionId ?? payment.tranId ?? 'Not available')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <ReceiptText className="mt-0.5 size-5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Rental order</p>
              <p className="mt-1 break-all font-mono text-sm font-semibold">
                {String(payment.rentalOrderId ?? 'Not available')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border p-4">
            <CalendarClock className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="mt-1 font-semibold">{formatDate(payment.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
