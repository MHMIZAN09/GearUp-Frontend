import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  PackageCheck,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { getCustomerRentals } from '../../_actions/rental.actions';

type RentalItem = {
  id?: string;
  quantity?: number;
  gearItem?: {
    id?: string;
    name?: string;
    brand?: string;
    imageUrl?: string;
    pricePerDay?: string | number;
  };
};

type Rental = {
  id: string;
  status?: string;
  paymentStatus?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: string | number;
  rentalItems?: RentalItem[];
};

const getRentals = (data: unknown): Rental[] => {
  if (Array.isArray(data)) {
    return data as Rental[];
  }

  if (data && typeof data === 'object') {
    const possibleData = data as { data?: unknown; rentals?: unknown; result?: unknown };

    if (Array.isArray(possibleData.data)) {
      return possibleData.data as Rental[];
    }

    if (Array.isArray(possibleData.rentals)) {
      return possibleData.rentals as Rental[];
    }

    if (Array.isArray(possibleData.result)) {
      return possibleData.result as Rental[];
    }
  }

  return [];
};

const formatDate = (date?: string) => {
  if (!date) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const normalizeStatus = (status?: string) => status?.toUpperCase() ?? 'PENDING';

const formatStatus = (status?: string) =>
  normalizeStatus(status)
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const isPaymentReady = (rental: Rental) => {
  const status = normalizeStatus(rental.status);
  const paymentStatus = normalizeStatus(rental.paymentStatus);

  return ['CONFIRMED', 'APPROVED'].includes(status) && paymentStatus !== 'PAID';
};

const getStatusIcon = (status?: string) => {
  const normalizedStatus = normalizeStatus(status);

  if (['CONFIRMED', 'APPROVED', 'COMPLETED'].includes(normalizedStatus)) {
    return <CheckCircle2 className="size-4 text-emerald-600" />;
  }

  if (['CANCELLED', 'REJECTED'].includes(normalizedStatus)) {
    return <XCircle className="size-4 text-destructive" />;
  }

  return <Clock3 className="size-4 text-amber-600" />;
};

const getStatusVariant = (status?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const normalizedStatus = normalizeStatus(status);

  if (['CONFIRMED', 'APPROVED', 'COMPLETED'].includes(normalizedStatus)) {
    return 'default';
  }

  if (['CANCELLED', 'REJECTED'].includes(normalizedStatus)) {
    return 'destructive';
  }

  return 'secondary';
};

const CustomerRentalsPage = async () => {
  const result = await getCustomerRentals();
  const rentals = result.success ? getRentals(result.data) : [];
  const pendingCount = rentals.filter((rental) => normalizeStatus(rental.status) === 'PENDING').length;
  const paymentReadyCount = rentals.filter(isPaymentReady).length;

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 rounded-full">
            Customer dashboard
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">My rentals</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            After you request gear, the provider confirms availability. Your payment button appears
            here only after confirmation.
          </p>
        </div>

        <Button asChild className="rounded-full">
          <Link href="/gear">Browse gear</Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PackageCheck className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rentals.length}</p>
              <p className="text-sm text-muted-foreground">Total rentals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <Clock3 className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Waiting provider</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{paymentReadyCount}</p>
              <p className="text-sm text-muted-foreground">Payment ready</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {!result.success ? (
        <Card>
          <CardContent className="px-6 py-12 text-center">
            <XCircle className="mx-auto size-10 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Could not load rentals</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {result.message ?? 'Please try again after logging in.'}
            </p>
          </CardContent>
        </Card>
      ) : rentals.length === 0 ? (
        <Card>
          <CardContent className="px-6 py-16 text-center">
            <CalendarDays className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">No rental requests yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Open a gear item, choose dates, and click Rent Now. Your request will appear here.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/gear">Find gear</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-4">
          {rentals.map((rental) => {
            const firstItem = rental.rentalItems?.[0];
            const gear = firstItem?.gearItem;
            const status = normalizeStatus(rental.status);
            const paymentStatus = normalizeStatus(rental.paymentStatus ?? 'UNPAID');

            return (
              <Card key={rental.id} className="overflow-hidden">
                <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getStatusVariant(status)} className="gap-1 rounded-full">
                        {getStatusIcon(status)}
                        {formatStatus(status)}
                      </Badge>
                      <Badge variant={paymentStatus === 'PAID' ? 'default' : 'outline'}>
                        {formatStatus(paymentStatus)}
                      </Badge>
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                      {gear?.name ?? 'Rental request'}
                    </h2>

                    <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div>
                        <p className="font-medium text-foreground">Dates</p>
                        <p>
                          {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Quantity</p>
                        <p>{firstItem?.quantity ?? 1} item</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Total</p>
                        <p>{rental.totalPrice ? `৳${rental.totalPrice}` : 'Pending'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    {isPaymentReady(rental) ? (
                      <Button asChild className="rounded-full">
                        <Link href={`/dashboard/payments?rentalId=${rental.id}`}>Pay now</Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline" className="rounded-full">
                        {paymentStatus === 'PAID' ? 'Paid' : 'Waiting for provider'}
                      </Button>
                    )}

                    {gear?.id ? (
                      <Button asChild variant="ghost" className="rounded-full">
                        <Link href={`/gear/${gear.id}`}>View gear</Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default CustomerRentalsPage;
