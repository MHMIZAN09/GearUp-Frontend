import {
  CheckCircle2,
  Clock3,
  CreditCard,
  RotateCcw,
  Star,
  PackageCheck,
  Wallet,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { getCustomerAnalytics } from '../../_actions/analytics.actions';

type AnalyticsData = {
  totalRentals?: number;
  totalPendingRentals?: number;
  totalConfirmedRentals?: number;
  totalPickedUpRentals?: number;
  totalReturnedRentals?: number;
  totalCancelledRentals?: number;
  totalPayments?: number;
  totalPendingPayments?: number;
  totalPaidPayments?: number;
  totalReviews?: number;
  totalSpent?: number | string;
};

const getAnalyticsData = (data: unknown): AnalyticsData => {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const payload = data as { data?: unknown };

  if (payload.data && typeof payload.data === 'object') {
    return payload.data as AnalyticsData;
  }

  return data as AnalyticsData;
};

const getNumber = (value: unknown) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return Number(value) || 0;
  }

  return 0;
};

const formatMoney = (value: unknown) => `৳${getNumber(value).toLocaleString()}`;

const metricCards = [
  {
    key: 'totalRentals',
    label: 'Total Rentals',
    helper: 'All requests you created',
    icon: PackageCheck,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    key: 'totalPendingRentals',
    label: 'Waiting Provider',
    helper: 'Not confirmed yet',
    icon: Clock3,
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    key: 'totalConfirmedRentals',
    label: 'Confirmed',
    helper: 'Ready for payment',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    key: 'totalPaidPayments',
    label: 'Paid Payments',
    helper: 'Payment completed',
    icon: CreditCard,
    color: 'text-sky-600',
    bg: 'bg-sky-500/10',
  },
] as const;

export async function CustomerAnalyticsDashboard() {
  const result = await getCustomerAnalytics();
  const analytics = result.success ? getAnalyticsData(result.data) : {};
  const totalSpent = analytics.totalSpent ?? 0;
  const totalPayments = analytics.totalPayments ?? 0;
  const totalPendingPayments = analytics.totalPendingPayments ?? 0;
  const totalReturnedRentals = analytics.totalReturnedRentals ?? 0;
  const totalPickedUpRentals = analytics.totalPickedUpRentals ?? 0;
  const totalCancelledRentals = analytics.totalCancelledRentals ?? 0;
  const totalReviews = analytics.totalReviews ?? 0;

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 rounded-full">
            Customer Analytics
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard overview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            See your rental activity, provider confirmations, payment status, reviews, and total
            spending in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/rentals">My rentals</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/gear">Browse gear</Link>
          </Button>
        </div>
      </section>

      {!result.success ? (
        <Card>
          <CardContent className="px-6 py-12 text-center">
            <Clock3 className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Analytics unavailable</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {result.message ?? 'Please login to view your dashboard analytics.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((metric) => {
              const Icon = metric.icon;
              const value = getNumber(analytics[metric.key]);

              return (
                <Card key={metric.key}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div
                      className={`flex size-11 items-center justify-center rounded-full ${metric.bg} ${metric.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="font-medium">{metric.label}</p>
                      <p className="text-xs text-muted-foreground">{metric.helper}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Rental activity</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A quick breakdown from your analytics response
                    </p>
                  </div>
                  <PackageCheck className="size-6 text-primary" />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <span className="font-medium">Confirmed</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold">
                      {getNumber(analytics.totalConfirmedRentals)}
                    </p>
                    <p className="text-sm text-muted-foreground">Provider approved rentals</p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="flex items-center gap-2">
                      <PackageCheck className="size-4 text-sky-600" />
                      <span className="font-medium">Picked up</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold">{getNumber(totalPickedUpRentals)}</p>
                    <p className="text-sm text-muted-foreground">Currently collected items</p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="size-4 text-primary" />
                      <span className="font-medium">Returned</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold">{getNumber(totalReturnedRentals)}</p>
                    <p className="text-sm text-muted-foreground">Completed return records</p>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="size-4 text-destructive" />
                      <span className="font-medium">Cancelled</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold">{getNumber(totalCancelledRentals)}</p>
                    <p className="text-sm text-muted-foreground">Cancelled rental requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="mt-2 text-3xl font-bold">{formatMoney(totalSpent)}</p>
                    </div>
                    <Wallet className="size-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-xl font-bold">Payments & reviews</h2>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Total payments</span>
                    <span className="font-bold">{getNumber(totalPayments)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Pending payments</span>
                    <span className="font-bold">{getNumber(totalPendingPayments)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="size-4 text-amber-600" />
                      Reviews
                    </span>
                    <span className="font-bold">{getNumber(totalReviews)}</span>
                  </div>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/dashboard/rentals">Check payments</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
