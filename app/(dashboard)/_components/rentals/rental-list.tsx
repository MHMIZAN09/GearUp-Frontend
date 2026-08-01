'use client';

import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Rental = {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  rentalItems: {
    id: string;
    quantity: number;
    gearItem: {
      name: string;
      imageUrl: string;
    };
  }[];
  payments: {
    id: string;
    amount: string;
    status: string;
  }[];
};

type Props = {
  rentals: Rental[];
};

export default function RentalList({ rentals }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rental ID</TableHead>
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
              <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                No rentals found.
              </TableCell>
            </TableRow>
          ) : (
            rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell className="font-mono text-xs">{rental.id.slice(0, 8)}...</TableCell>

                <TableCell>
                  <div className="space-y-1">
                    {rental.rentalItems.map((item) => (
                      <div key={item.id}>
                        {item.gearItem.name}
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
                  {rental.payments.length === 0 ? (
                    <Badge variant="secondary">Unpaid</Badge>
                  ) : (
                    <Badge variant={rental.payments[0].status === 'PAID' ? 'default' : 'outline'}>
                      {rental.payments[0].status}
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      rental.status === 'CONFIRMED'
                        ? 'default'
                        : rental.status === 'PENDING'
                          ? 'secondary'
                          : rental.status === 'CANCELLED'
                            ? 'destructive'
                            : 'outline'
                    }
                  >
                    {rental.status}
                  </Badge>
                </TableCell>

                <TableCell>{new Date(rental.createdAt).toLocaleDateString()}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="outline">
                      <Link href={`/admin-dashboard/rentals/${rental.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button size="icon" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
