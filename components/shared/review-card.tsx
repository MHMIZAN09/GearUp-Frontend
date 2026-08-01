import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

import RatingStars from './rating-stars';

type Review = {
  id: string;
  rating: number;
  comment: string;

  customer: {
    name: string;
  };

  gearItem: {
    name: string;
    imageUrl: string;
    brand: string;
  };

  rentalOrder: {
    startDate: string;
    endDate: string;
  };
};

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <Card className="h-full transition hover:shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <Image
            src={review.gearItem.imageUrl}
            alt={review.gearItem.name}
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />

          <div>
            <h3 className="font-semibold">{review.gearItem.name}</h3>

            <p className="text-sm text-muted-foreground">{review.gearItem.brand}</p>
          </div>
        </div>

        <RatingStars rating={review.rating} />

        <p className="italic text-muted-foreground">{review.comment}</p>

        <div className="border-t pt-4">
          <p className="font-medium">{review.customer.name}</p>

          <p className="text-sm text-muted-foreground">
            Rental: {new Date(review.rentalOrder.startDate).toLocaleDateString()}
            {' - '}
            {new Date(review.rentalOrder.endDate).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
