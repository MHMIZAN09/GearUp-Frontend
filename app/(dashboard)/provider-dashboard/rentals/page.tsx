import { CheckCircle2, Clock, PackageCheck } from 'lucide-react';

import { confirmRental, getProviderRentals } from '../../_actions/rental.actions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type RentalItem = {
  id?: string;
  quantity?: number;
  gearItem?: {
    name?: string;
    brand?: string;
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
  customer?: {
    name?: string;
    email?: string;
  };
};

const getRentals = (data: unknown): Rental[] => {
  if (Array.isArray(data)) {
    return data as Rental[];
  }

  if (data && typeof data === 'object' && 'data' in data) {
    const nestedData = (data as { data?: unknown }).data;
    return Array.isArray(nestedData) ? (nestedData as Rental[]) : [];
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

const formatStatus = (status?: string) => status?.replaceAll('_', ' ') ?? 'PENDING';

const canConfirm = (rental: Rental) => rental.status?.toUpperCase() === 'PENDING';

const ProviderRentalsPage = async () => {
  const result = await getProviderRentals();
  const rentals = result.success ? getRentals(result.data) : [];
  const pendingCount = rentals.filter(canConfirm).length;
  const confirmedCount = rentals.filter((rental) =>
    ['CONFIRMED', 'APPROVED'].includes(rental.status?.toUpperCase() ?? ''),
  ).length;

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rental requests</h1>
        <p className="mt-1 text-muted-foreground">
          Confirm customer requests so payment becomes available on their dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <PackageCheck className="size-9 text-primary" />
            <div>
              <p className="text-2xl font-bold">{rentals.length}</p>
              <p className="text-sm text-muted-foreground">Total requests</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Clock className="size-9 text-amber-600" />
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <CheckCircle2 className="size-9 text-emerald-600" />
            <div>
              <p className="text-2xl font-bold">{confirmedCount}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {rentals.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <PackageCheck className="mx-auto size-10 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">No requests yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                New customer rental requests for your gear will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Gear</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map((rental) => {
                  const firstItem = rental.rentalItems?.[0];

                  return (
                    <TableRow key={rental.id}>
                      <TableCell>
                        <p className="font-semibold">{rental.customer?.name ?? 'Customer'}</p>
                        <p className="text-muted-foreground">{rental.customer?.email ?? ''}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">
                          {firstItem?.gearItem?.name ?? 'Gear item'}
                        </p>
                        <p className="text-muted-foreground">
                          Qty {firstItem?.quantity ?? 1}
                          {rental.totalPrice ? ` · ৳${rental.totalPrice}` : ''}
                        </p>
                      </TableCell>
                      <TableCell>
                        {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={canConfirm(rental) ? 'secondary' : 'default'}>
                          {formatStatus(rental.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={rental.paymentStatus === 'PAID' ? 'default' : 'outline'}>
                          {formatStatus(rental.paymentStatus ?? 'UNPAID')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {canConfirm(rental) ? (
                          <form action={confirmRental}>
                            <input type="hidden" name="rentalId" value={rental.id} />
                            <Button size="sm" className="rounded-full">
                              Confirm
                            </Button>
                          </form>
                        ) : (
                          <span className="text-sm text-muted-foreground">No action</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ProviderRentalsPage;
