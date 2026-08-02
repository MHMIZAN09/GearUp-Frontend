import { CalendarDays, CreditCard, ReceiptText, WalletCards } from 'lucide-react';
import Link from 'next/link';

import { getAllPaymentsByUser } from '@/app/(dashboard)/_actions/payments.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type RentalOrder = {
  id?: string;
  status?: string;
  totalAmount?: string | number;
  rentalItems?: {
    id?: string;
    quantity?: number;
    gearItem?: {
      id?: string;
      name?: string;
    };
  }[];
};

type Payment = {
  id?: string;
  amount?: string | number;
  createdAt?: string;
  gateway?: string;
  paymentMethod?: string;
  rentalOrder?: RentalOrder;
  rentalOrderId?: string;
  status?: string;
  transactionId?: string;
  tranId?: string;
  updatedAt?: string;
};

const currencyFormatter = new Intl.NumberFormat('en-BD', {
  currency: 'BDT',
  maximumFractionDigits: 0,
  style: 'currency',
});

const dateFormatter = new Intl.DateTimeFormat('en-BD', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const getPayments = (data: unknown): Payment[] => {
  if (Array.isArray(data)) {
    return data as Payment[];
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;

    if (Array.isArray(record.payments)) {
      return record.payments as Payment[];
    }

    if (Array.isArray(record.data)) {
      return record.data as Payment[];
    }
  }

  return [];
};

const formatCurrency = (amount?: string | number) => {
  const value = Number(amount ?? 0);

  if (!Number.isFinite(value)) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(value);
};

const formatDate = (date?: string) => {
  if (!date) {
    return 'Not available';
  }

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return 'Not available';
  }

  return dateFormatter.format(value);
};

const getStatusBadgeVariant = (status?: string) => {
  switch (status?.toUpperCase()) {
    case 'PAID':
    case 'SUCCESS':
    case 'COMPLETED':
      return 'default';
    case 'FAILED':
    case 'CANCELLED':
    case 'CANCELED':
      return 'destructive';
    case 'PENDING':
    case 'PROCESSING':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getOrderItems = (payment: Payment) => {
  const items = payment.rentalOrder?.rentalItems ?? [];

  if (items.length === 0) {
    return 'Rental order';
  }

  return items
    .map((item) => {
      const name = item.gearItem?.name ?? 'Gear item';
      const quantity = item.quantity ? ` x ${item.quantity}` : '';

      return `${name}${quantity}`;
    })
    .join(', ');
};

const PaymentsPage = async () => {
  const result = await getAllPaymentsByUser();
  const payments = result.success ? getPayments(result.data) : [];

  const totalPaid = payments
    .filter((payment) => payment.status?.toUpperCase() === 'PAID')
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
  const paidCount = payments.filter((payment) => payment.status?.toUpperCase() === 'PAID').length;
  const pendingCount = payments.filter(
    (payment) => payment.status?.toUpperCase() === 'PENDING'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Payments</h1>
          <p className="text-muted-foreground">
            Track your rental payment history, status, and transaction references.
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/dashboard/rentals">
            <ReceiptText className="size-4" />
            View rentals
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Total Paid</CardTitle>
            <WalletCards className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
            <p className="text-muted-foreground">Completed rental payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Paid Orders</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{paidCount}</p>
            <p className="text-muted-foreground">Payments marked as paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Pending</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-muted-foreground">Waiting for confirmation</p>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Rental</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!result.success ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  {result.message || 'Unable to load your payments.'}
                </TableCell>
              </TableRow>
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  No payments found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => {
                const paymentId = payment.id ?? 'N/A';
                const orderId = payment.rentalOrder?.id ?? payment.rentalOrderId;
                const transactionId = payment.transactionId ?? payment.tranId ?? 'Not available';
                const method = payment.paymentMethod ?? payment.gateway ?? 'Gateway';
                const status = payment.status ?? 'UNKNOWN';

                return (
                  <TableRow key={paymentId}>
                    <TableCell className="font-mono text-xs">
                      {paymentId === 'N/A' ? paymentId : `${paymentId.slice(0, 8)}...`}
                    </TableCell>

                    <TableCell className="max-w-64 whitespace-normal">
                      <div className="space-y-1">
                        <p className="font-medium">{getOrderItems(payment)}</p>
                        <p className="break-all font-mono text-xs text-muted-foreground">
                          {orderId ? `Order ${orderId}` : 'Order not available'}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="max-w-48 whitespace-normal break-all font-mono text-xs">
                      {transactionId}
                    </TableCell>

                    <TableCell>{method}</TableCell>

                    <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>

                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
                    </TableCell>

                    <TableCell>{formatDate(payment.createdAt ?? payment.updatedAt)}</TableCell>

                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/dashboard/rentals">Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsPage;
