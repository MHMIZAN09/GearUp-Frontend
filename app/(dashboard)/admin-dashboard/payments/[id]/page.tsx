import { ArrowLeft, CalendarClock, CreditCard, Hash, ReceiptText } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminPaymentById } from '../../../_actions/payments.actions';
import { AdminPageHeader } from '../../../_components/admin/admin-page-header';

const PaymentsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const result = await getAdminPaymentById(id);

  if (!result.success || !result.data) {
    return (
      <div className="rounded-3xl border border-dashed px-6 py-16 text-center">
        <ReceiptText className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Payment unavailable</h1>
        <p className="mt-2 text-muted-foreground">{result.message}</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/admin-dashboard/payments">Back to payments</Link>
        </Button>
      </div>
    );
  }

  const payment = result.data;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Financial operations"
        title="Payment details"
        description="Review the transaction record and its current payment status."
        icon={CreditCard}
        metric={{ label: 'Status', value: payment.status }}
      />

      <Button asChild variant="outline" className="rounded-full">
        <Link href="/admin-dashboard/payments">
          <ArrowLeft className="size-4" />
          Back to payments
        </Link>
      </Button>

      <Card className="rounded-3xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
          <div>
            <CardTitle className="text-xl">Transaction summary</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Payment record #{payment.id}</p>
          </div>
          <Badge variant={payment.status === 'PAID' ? 'default' : 'secondary'}>
            {payment.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-5 p-6 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
            <CreditCard className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="mt-1 text-2xl font-bold">৳{Number(payment.amount).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
            <Hash className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="mt-1 break-all font-mono text-sm font-semibold">
                {payment.transactionId || 'Not available'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
            <ReceiptText className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Rental order</p>
              <p className="mt-1 break-all font-mono text-sm font-semibold">
                {payment.rentalOrderId}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border bg-muted/20 p-4">
            <CalendarClock className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="mt-1 font-semibold">
                {new Date(payment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsDetailsPage;
