'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import DeleteConfirmDialog from '@/components/shared/delete-confirm-dialog';

import { deleteReview } from '../../_actions/reviews.actions';

type Props = {
  reviewId: string;
};

export default function DeleteReviewButton({ reviewId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteReview(reviewId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success('Review deleted successfully');

    router.refresh();
  };

  return (
    <DeleteConfirmDialog
      title="Delete Review?"
      description="Are you sure you want to delete this review? This action cannot be undone."
      confirmText="Delete"
      onConfirm={handleDelete}
      trigger={
        <Button size="sm" variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      }
    />
  );
}
