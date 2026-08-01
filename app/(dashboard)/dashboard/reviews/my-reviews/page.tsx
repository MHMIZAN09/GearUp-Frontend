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

import { getMyReviews } from '../../../_actions/reviews.actions';
import DeleteReviewButton from '../../../_components/reviews/delete-review-button';

const ReviewsPage = async () => {
  const result = await getMyReviews();

  const reviews = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">View all reviews you have submitted.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Rental</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.gearItem?.name}</TableCell>

                  <TableCell>
                    <Badge>{review.rating} ⭐</Badge>
                  </TableCell>

                  <TableCell className="max-w-sm truncate">{review.comment}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{review.rentalOrder?.status}</Badge>
                  </TableCell>

                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>

                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/gear/${review.gearItemId}`}>View Gear</Link>
                    </Button>
                    <DeleteReviewButton reviewId={review.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewsPage;
