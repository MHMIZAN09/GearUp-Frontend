/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewCard from './review-card';

type Props = {
  reviews: any[];
};

export default function ReviewSection({ reviews }: Props) {
  if (!reviews.length) return null;

  return (
    <section className="container mx-auto py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">Customer Reviews</h2>

        <p className="mt-3 text-muted-foreground">
          Trusted by our happy customers across Bangladesh.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
