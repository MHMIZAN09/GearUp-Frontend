'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ReviewForm } from './review-form';

type Props = {
  rentalOrderId: string;
  gearItemId: string;
};

export default function ReviewButton({ rentalOrderId, gearItemId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Write Review
      </Button>

      <ReviewForm
        open={open}
        onOpenChange={setOpen}
        rentalOrderId={rentalOrderId}
        gearItemId={gearItemId}
      />
    </>
  );
}
