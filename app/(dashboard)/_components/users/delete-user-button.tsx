'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import DeleteConfirmDialog from '../../../../components/shared/delete-confirm-dialog';
import { deleteUserById } from '../../_actions/users.actions';

type Props = {
  id: string;
};

export default function DeleteUserButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteUserById(id);

    if (result.success) {
      toast.success(result.message ?? 'User deleted successfully');
      router.refresh();
    } else {
      toast.error(result.message ?? 'Failed to delete user');
    }
  };

  return (
    <DeleteConfirmDialog
      title="Delete User?"
      description="This action cannot be undone. This user will be permanently deleted."
      trigger={
        <Button size="icon" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      }
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleDelete}
    />
  );
}
