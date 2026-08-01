/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getCustomerRentals } from '../../_actions/rental.actions';
import PaymentButton from '../../_components/payments/payment-button';
import ReviewButton from '../../_components/reviews/review-button';

const CustomerRentalsPage = async () => {
  const result = await getCustomerRentals();

  const rentals = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Rentals</h1>
          <p className="text-muted-foreground">View your rental requests and payment status.</p>
        </div>

        <Button asChild>
          <Link href="/gear">Browse Gear</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Rental Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center">
                  No rentals found.
                </TableCell>
              </TableRow>
            ) : (
              rentals.map((rental: any) => {
                const paymentStatus =
                  rental.payments?.length > 0 ? rental.payments[0].status : 'UNPAID';

                const canPay = rental.status === 'CONFIRMED' && paymentStatus !== 'PAID';

                return (
                  <TableRow key={rental.id}>
                    <TableCell>{rental.rentalItems?.[0]?.gearItem?.name}</TableCell>

                    <TableCell>{new Date(rental.startDate).toLocaleDateString()}</TableCell>

                    <TableCell>{new Date(rental.endDate).toLocaleDateString()}</TableCell>

                    <TableCell>{rental.rentalItems?.[0]?.quantity}</TableCell>

                    <TableCell>৳{rental.totalAmount}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          rental.status === 'CONFIRMED'
                            ? 'default'
                            : rental.status === 'PENDING'
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {rental.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          paymentStatus === 'PAID'
                            ? 'default'
                            : paymentStatus === 'FAILED'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {canPay ? (
                          <PaymentButton rentalOrderId={rental.id} />
                        ) : (
                          <Button disabled variant="outline">
                            {paymentStatus === 'PAID'
                              ? 'Paid'
                              : paymentStatus === 'PENDING'
                                ? 'Processing'
                                : 'Waiting'}
                          </Button>
                        )}

                        <Button asChild variant="outline" size="sm">
                          <Link href={`/gear/${rental.rentalItems?.[0]?.gearItem?.id}`}>View</Link>
                        </Button>

                        {paymentStatus === 'PAID' && (
                          <ReviewButton
                            rentalOrderId={rental.id}
                            gearItemId={rental.rentalItems[0].gearItem.id}
                          />
                        )}
                      </div>
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

export default CustomerRentalsPage;
