import {
  Banknote,
  Bike,
  CheckCircle2,
  CreditCard,
  PackageCheck,
  Wallet,
  XCircle,
} from 'lucide-react';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <p className="text-muted-foreground">Overview of your gears, rentals and payments.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-primary lg:col-span-2 xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>

            <Banknote className="h-6 w-6 text-green-600" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold text-green-600">
              ৳{Number(analytics.totalRevenue).toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Total earnings from completed payments.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderAnalyticsDashboard;
