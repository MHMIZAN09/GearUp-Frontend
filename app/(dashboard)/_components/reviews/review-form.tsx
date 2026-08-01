'use client';

import { useState, useTransition } from 'react';

import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { createReview } from '../../_actions/reviews.actions';
import RatingInput from './rating-input';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  rentalOrderId: string;
  gearItemId: string;
};

export function ReviewForm({ open, onOpenChange, rentalOrderId, gearItemId }: Props) {
  const [pending, startTransition] = useTransition();

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await createReview({
        rentalOrderId,
        gearItemId,
        rating,
        comment,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Review submitted successfully');

      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Rating</Label>

            <div className="mt-2">
              <RatingInput value={rating} onChange={setRating} />
            </div>
          </div>

          <div>
            <Label>Comment</Label>

            <Textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            />
          </div>

          <Button className="w-full" disabled={pending} onClick={handleSubmit}>
            {pending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
