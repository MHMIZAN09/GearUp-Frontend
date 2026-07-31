'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import DeleteConfirmDialog from '../../../../components/shared/delete-confirm-dialog';
import { deleteCategory } from '../../_actions/category.actions';

export default function DeleteCategoryButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <DeleteConfirmDialog
      title="Delete Category?"
      description="This category will be permanently deleted."
      trigger={
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      }
      onConfirm={async () => {
        const result = await deleteCategory(id);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      }}
    />
  );
}
