import {
  Banknote,
  Bike,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  PackageCheck,
  Wallet,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProviderAnalytics } from '../../_actions/analytics.actions';

const ProviderAnalyticsDashboard = async () => {
  const result = await getProviderAnalytics();

  if (!result.success) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h2 className="text-xl font-semibold">{result.message}</h2>
      </div>
    );
  }

  const analytics = result.data;

  const cards = [
    {
      title: 'Total Gears',
      value: analytics.totalGears,
      icon: Bike,
    },
    {
      title: 'Active Gears',
      value: analytics.totalActiveGears,
      icon: PackageCheck,
    },
    {
      title: 'Inactive Gears',
      value: analytics.totalInactiveGears,
      icon: XCircle,
    },
    {
      title: 'Total Rentals',
      value: analytics.totalRentals,
      icon: CreditCard,
    },
    {
      title: 'Pending Rentals',
      value: analytics.totalPendingRentals,
      icon: PackageCheck,
    },
    {
      title: 'Completed Rentals',
      value: analytics.totalCompletedRentals,
      icon: CheckCircle2,
    },
    {
      title: 'Cancelled Rentals',
      value: analytics.totalCancelledRentals,
      icon: XCircle,
    },
    {
      title: 'Total Payments',
      value: analytics.totalPayments,
      icon: Wallet,
    },
    {
      title: 'Pending Payments',
      value: analytics.totalPendingPayments,
      icon: CreditCard,
    },
    {
      title: 'Completed Payments',
      value: analytics.totalCompletedPayments,
      icon: CheckCircle2,
    },
    {
      title: 'Failed Payments',
      value: analytics.totalFailedPayments,
      icon: XCircle,
    },
    {
      title: 'Cancelled Payments',
      value: analytics.totalCancelledPayments,
      icon: XCircle,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary/90 to-emerald-700 p-6 text-primary-foreground shadow-lg shadow-primary/15 sm:p-8">
        <div className="absolute -right-12 -top-20 size-64 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 size-56 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-4 border-white/20 bg-white/15 text-white hover:bg-white/20">
              Provider workspace
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Grow your gear rental business
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Keep your inventory ready, respond to rental requests, and track earnings from one
              focused workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/provider-dashboard/gears">Manage my gear</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/provider-dashboard/rentals">
                View rentals <ExternalLink className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="border-border/70 transition-shadow hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-muted-foreground">{card.title}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-emerald-500/5">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Revenue overview</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Earnings from completed customer payments
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Banknote className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold tracking-tight text-emerald-600">
              ৳{Number(analytics.totalRevenue).toLocaleString()}
            </p>
            <div className="mt-6 flex items-center justify-between rounded-2xl border bg-background/70 p-4">
              <div>
                <p className="text-xs text-muted-foreground">Completed payments</p>
                <p className="mt-1 text-xl font-semibold">{analytics.totalCompletedPayments}</p>
              </div>
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Keep your workspace active</CardTitle>
            <p className="text-sm text-muted-foreground">
              Quick actions to keep rentals moving.
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Button asChild className="justify-between rounded-xl">
              <Link href="/provider-dashboard/gears">
                Add or update gear <Bike className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between rounded-xl">
              <Link href="/provider-dashboard/rentals">
                Review rental requests <PackageCheck className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderAnalyticsDashboard;
