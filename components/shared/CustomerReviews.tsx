import { BadgeCheck, MessageSquareQuote, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import RatingStars from './rating-stars';
import { getAllReviews } from '@/app/(dashboard)/_actions/reviews.actions';

type CustomerReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt?: string;
  customer?: {
    name?: string;
    fullName?: string;
  };
  gearItem?: {
    name?: string;
  };
  gearItemId?: string;
  rentalOrderId?: string;
  rentalOrder?: {
    id?: string;
    status?: string;
  };
};

type ReviewsResponse = {
  success?: boolean;
  data?: CustomerReview[];
};

const getCustomerName = (review: CustomerReview) =>
  review.customer?.fullName || review.customer?.name || 'GearUp customer';

const isVerifiedRental = (review: CustomerReview) =>
  Boolean(review.rentalOrderId || review.rentalOrder?.id);

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export default async function CustomerReviews() {
  let reviews: CustomerReview[] = [];

  try {
    const result: ReviewsResponse = await getAllReviews();
    reviews = result.success && Array.isArray(result.data) ? result.data.slice(0, 3) : [];
  } catch (error) {
    console.error('Unable to load customer reviews for the home page.', error);
  }

  return (
    <section aria-labelledby="customer-reviews-title" className="mx-auto max-w-6xl py-4">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <MessageSquareQuote className="size-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Customer reviews
          </p>
          <h2
            id="customer-reviews-title"
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Loved by real renters
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Honest experiences from customers who found the right gear for their next adventure.
          </p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 self-start rounded-2xl border bg-card px-4 py-3 shadow-sm sm:self-auto">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Star className="size-5 fill-current" />
            </div>
            <div>
              <p className="text-lg font-bold">
                {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
                <span className="text-sm font-medium text-muted-foreground"> / 5</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <Card className="border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm">
              <MessageSquareQuote className="size-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">No reviews yet</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Customer experiences will appear here after renters complete their bookings and
              share their feedback.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="group h-full rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-full bg-amber-500/10 px-3 py-1.5">
                    <RatingStars rating={review.rating} />
                  </div>
                  {isVerifiedRental(review) && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                      <BadgeCheck className="size-4" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="relative mt-6 flex-1">
                  <span className="absolute -left-1 -top-4 text-5xl font-serif leading-none text-primary/20">
                    &ldquo;
                  </span>
                  <p className="relative text-base leading-7 text-foreground/80">{review.comment}</p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t pt-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {getInitials(getCustomerName(review))}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{getCustomerName(review)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary" className="max-w-[170px] truncate">
                        {review.gearItem?.name || 'Gear item'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{review.rating}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
