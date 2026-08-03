import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ProviderRentalActions } from './provider-rental-actions';

type Rental = {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  customer?: {
    name?: string;
    fullName?: string;
    email?: string;
  };
  user?: {
    name?: string;
    fullName?: string;
    email?: string;
  };
  rentalItems?: {
    id: string;
    quantity: number;
    gearItem?: {
      name?: string;
      imageUrl?: string;
    };
    gear?: {
      name?: string;
    };
  }[];
  payments?: {
    id: string;
    amount: string;
    status: string;
  }[];
};

type ProviderRentalListProps = {
  rentals: Rental[];
};

function getStatusVariant(status: string) {
  if (status === 'CONFIRMED' || status === 'ACTIVE' || status === 'COMPLETED') {
    return 'default';
  }

  if (status === 'PENDING') return 'secondary';
  if (status === 'CANCELLED') return 'destructive';

  return 'outline';
}

function getCustomerName(rental: Rental) {
  return (
    rental.customer?.fullName ||
    rental.customer?.name ||
    rental.user?.fullName ||
    rental.user?.name ||
    rental.customer?.email ||
    rental.user?.email ||
    'N/A'
  );
}

export function ProviderRentalList({ rentals }: ProviderRentalListProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rental ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Rental Period</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rentals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                No provider rentals found.
              </TableCell>
            </TableRow>
          ) : (
            rentals.map((rental) => {
              const payment = rental.payments?.[0];

              return (
                <TableRow key={rental.id}>
                  <TableCell className="font-mono text-xs">{rental.id.slice(0, 8)}...</TableCell>

                  <TableCell>{getCustomerName(rental)}</TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      {(rental.rentalItems ?? []).map((item) => (
                        <div key={item.id}>
                          {item.gearItem?.name || item.gear?.name || 'Gear'}
                          <span className="text-muted-foreground"> × {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(rental.startDate).toLocaleDateString()}</p>
                      <p className="text-muted-foreground">to</p>
                      <p>{new Date(rental.endDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold">৳{rental.totalAmount}</TableCell>

                  <TableCell>
                    {payment ? (
                      <Badge variant={payment.status === 'PAID' ? 'default' : 'outline'}>
                        {payment.status}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unpaid</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Badge variant={getStatusVariant(rental.status)}>{rental.status}</Badge>
                  </TableCell>

                  <TableCell>{new Date(rental.createdAt).toLocaleDateString()}</TableCell>

                  <TableCell>
                    <ProviderRentalActions
                      rentalId={rental.id}
                      currentStatus={rental.status}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
