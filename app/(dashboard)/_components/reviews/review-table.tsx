'use client';

import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Review = {
  id: string;
  rating: number;
  comment: string;
  gearItemId: string;
  customerId: string;
  rentalOrderId: string;
  createdAt: string;

  gearItem?: {
    name: string;
  };

  customer?: {
    name?: string;
    fullName?: string;
    email?: string;
  };

  rentalOrder?: {
    id: string;
    status?: string;
  };
};

type Props = {
  reviews: Review[];
};

export const ReviewTable = ({ reviews }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Gear</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Rental</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                No reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id}>
                {/* Customer */}
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {review.customer?.fullName || review.customer?.name || 'Unknown Customer'}
                    </p>

                    <p className="text-xs text-muted-foreground">{review.customer?.email ?? ''}</p>
                  </div>
                </TableCell>

                {/* Gear */}
                <TableCell>
                  <Badge variant="secondary">{review.gearItem?.name ?? 'N/A'}</Badge>
                </TableCell>

                {/* Rating */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{review.rating}/5</span>
                  </div>
                </TableCell>

                {/* Comment */}
                <TableCell className="max-w-sm">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{review.comment}</p>
                </TableCell>

                {/* Rental */}
                <TableCell>
                  <div>
                    <p className="font-mono text-xs">{review.rentalOrderId.slice(0, 8)}...</p>

                    {review.rentalOrder?.status && (
                      <Badge variant="outline" className="mt-1">
                        {review.rentalOrder.status}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Created */}
                <TableCell>
                  {new Date(review.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
