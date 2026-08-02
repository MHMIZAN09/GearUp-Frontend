import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  PackageCheck,
  Users,
  Wallet,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { getAdminAnalytics } from '../../_actions/analytics.actions';

type AggregateSum = {
  _sum?: {
    quantityAvailable?: number | string | null;
  };
};

type AdminAnalyticsData = {
  totalActiveUsers?: number | string;
  totalAvailableGears?: number | string;
  totalAvailableQuantity?: AggregateSum | number | string;
  totalBlockedUsers?: number | string;
  totalCancelledPayments?: number | string;
  totalCompletedPayments?: number | string;
  totalFailedPayments?: number | string;
  totalGears?: number | string;
  totalMaintenanceGears?: number | string;
  totalOutOfStockGears?: number | string;
  totalPayments?: number | string;
  totalPendingPayments?: number | string;
  totalRentals?: number | string;
  totalRevenue?: number | string;
  totalUnavailableGears?: number | string;
  totalUsers?: number | string;
};

const getAnalyticsData = (data: unknown): AdminAnalyticsData => {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const payload = data as { data?: unknown };

  if (payload.data && typeof payload.data === 'object') {
    return payload.data as AdminAnalyticsData;
  }

  return data as AdminAnalyticsData;
};

const getNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
};

const getAvailableQuantity = (value: AdminAnalyticsData['totalAvailableQuantity']) => {
  if (value && typeof value === 'object') {
    return getNumber(value._sum?.quantityAvailable);
  }

  return getNumber(value);
};

const formatMoney = (value: unknown) =>
  new Intl.NumberFormat('en-BD', {
    currency: 'BDT',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(getNumber(value));

const getPercent = (value: number, total: number) => {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((value / total) * 100));
};

export async function AdminAnalyticsDashboard() {
  const result = await getAdminAnalytics();
  const analytics = result.success ? getAnalyticsData(result.data) : {};

  const totalUsers = getNumber(analytics.totalUsers);
  const totalActiveUsers = getNumber(analytics.totalActiveUsers);
  const totalBlockedUsers = getNumber(analytics.totalBlockedUsers);
  const totalGears = getNumber(analytics.totalGears);
  const totalAvailableGears = getNumber(analytics.totalAvailableGears);
  const totalUnavailableGears = getNumber(analytics.totalUnavailableGears);
  const totalMaintenanceGears = getNumber(analytics.totalMaintenanceGears);
  const totalOutOfStockGears = getNumber(analytics.totalOutOfStockGears);
  const totalAvailableQuantity = getAvailableQuantity(analytics.totalAvailableQuantity);
  const totalRentals = getNumber(analytics.totalRentals);
  const totalPayments = getNumber(analytics.totalPayments);
  const totalPendingPayments = getNumber(analytics.totalPendingPayments);
  const totalCompletedPayments = getNumber(analytics.totalCompletedPayments);
  const totalFailedPayments = getNumber(analytics.totalFailedPayments);
  const totalCancelledPayments = getNumber(analytics.totalCancelledPayments);
  const totalRevenue = getNumber(analytics.totalRevenue);

  const metricCards = [
    {
      label: 'Total Users',
      value: totalUsers,
      helper: `${totalActiveUsers} active, ${totalBlockedUsers} blocked`,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Total Gears',
      value: totalGears,
      helper: `${totalAvailableQuantity} units available`,
      icon: Package,
      color: 'text-sky-600',
      bg: 'bg-sky-500/10',
    },
    {
      label: 'Rental Orders',
      value: totalRentals,
      helper: 'All rental requests',
      icon: PackageCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Revenue',
      value: formatMoney(totalRevenue),
      helper: 'Payment amount collected',
      icon: Wallet,
      color: 'text-violet-600',
      bg: 'bg-violet-500/10',
    },
  ] as const;

  const gearStats = [
    {
      label: 'Available',
      value: totalAvailableGears,
      icon: CheckCircle2,
      className: 'text-emerald-600',
      bar: 'bg-emerald-500',
    },
    {
      label: 'Unavailable',
      value: totalUnavailableGears,
      icon: XCircle,
      className: 'text-destructive',
      bar: 'bg-destructive',
    },
    {
      label: 'Maintenance',
      value: totalMaintenanceGears,
      icon: AlertTriangle,
      className: 'text-amber-600',
      bar: 'bg-amber-500',
    },
    {
      label: 'Out of Stock',
      value: totalOutOfStockGears,
      icon: Package,
      className: 'text-muted-foreground',
      bar: 'bg-muted-foreground',
    },
  ] as const;

  const paymentStats = [
    {
      label: 'Pending',
      value: totalPendingPayments,
      icon: Clock3,
      className: 'text-amber-600',
      bar: 'bg-amber-500',
    },
    {
      label: 'Paid',
      value: totalCompletedPayments,
      icon: CheckCircle2,
      className: 'text-emerald-600',
      bar: 'bg-emerald-500',
    },
    {
      label: 'Failed',
      value: totalFailedPayments,
      icon: XCircle,
      className: 'text-destructive',
      bar: 'bg-destructive',
    },
    {
      label: 'Cancelled',
      value: totalCancelledPayments,
      icon: AlertTriangle,
      className: 'text-muted-foreground',
      bar: 'bg-muted-foreground',
    },
  ] as const;

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 rounded-full">
            Admin Analytics
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Platform overview</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor users, gear inventory, rental orders, payments, stock quantity, and revenue
            from the admin analytics API.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/admin-dashboard/rentals">Manage rentals</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/admin-dashboard/users">View users</Link>
          </Button>
        </div>
      </section>

      {!result.success ? (
        <Card>
          <CardContent className="px-6 py-12 text-center">
            <BarChart3 className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Analytics unavailable</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {result.message ?? 'Unable to load admin analytics right now.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((metric) => {
              const Icon = metric.icon;

              return (
                <Card key={metric.label}>
                  <CardContent className="flex items-center gap-4 p-5">
                    <div
                      className={`flex size-11 items-center justify-center rounded-full ${metric.bg} ${metric.color}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="font-medium">{metric.label}</p>
                      <p className="text-xs text-muted-foreground">{metric.helper}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_380px]">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Gear inventory</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Availability status across listed gear items.
                    </p>
                  </div>
                  <Badge variant="outline">{totalGears} total gears</Badge>
                </div>

                <div className="mt-6 space-y-4">
                  {gearStats.map((item) => {
                    const Icon = item.icon;
                    const percent = getPercent(item.value, totalGears);

                    return (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Icon className={`size-4 ${item.className}`} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold">{item.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${item.bar}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Users</h2>
                    <Users className="size-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">All users</span>
                    <span className="font-bold">{totalUsers}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Active users</span>
                    <span className="font-bold">{totalActiveUsers}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Blocked users</span>
                    <span className="font-bold">{totalBlockedUsers}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Payments</h2>
                    <CreditCard className="size-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Total payments</span>
                    <span className="font-bold">{totalPayments}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Paid payments</span>
                    <span className="font-bold">{totalCompletedPayments}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Pending payments</span>
                    <span className="font-bold">{totalPendingPayments}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Failed payments</span>
                    <span className="font-bold">{totalFailedPayments}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border bg-background p-4">
                    <span className="text-sm text-muted-foreground">Cancelled payments</span>
                    <span className="font-bold">{totalCancelledPayments}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">Available Quantity</p>
                  <p className="mt-2 text-2xl font-bold">{totalAvailableQuantity}</p>
                </div>
                <Package className="size-7 text-sky-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">Total Rentals</p>
                  <p className="mt-2 text-2xl font-bold">{totalRentals}</p>
                </div>
                <PackageCheck className="size-7 text-emerald-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">Average Payment</p>
                  <p className="mt-2 text-2xl font-bold">
                    {formatMoney(totalPayments > 0 ? totalRevenue / totalPayments : 0)}
                  </p>
                </div>
                <BarChart3 className="size-7 text-primary" />
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Payment status</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Breakdown of pending, paid, failed, and cancelled payments.
                  </p>
                </div>
                <Badge variant="outline">{totalPayments} total payments</Badge>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {paymentStats.map((item) => {
                  const Icon = item.icon;
                  const percent = getPercent(item.value, totalPayments);

                  return (
                    <div key={item.label} className="rounded-xl border bg-background p-4">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Icon className={`size-4 ${item.className}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="font-bold">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${item.bar}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}
