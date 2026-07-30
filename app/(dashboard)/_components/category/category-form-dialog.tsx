/* eslint-disable react-hooks/set-state-in-effect */
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { PencilIcon, PlusIcon } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '../../_actions/category.actions';

export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

type CategoryFormDialogProps = {
  mode: 'create' | 'edit';
  category?: ICategory;
};

export function CategoryFormDialog({ mode, category }: CategoryFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const action =
    mode === 'edit' && category ? updateCategory.bind(null, category.id) : createCategory;

  const [state, formAction, pending] = useActionState(action, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === 'edit' ? 'Category updated successfully' : 'Category created successfully'),
      );
      router.refresh();
      setOpen(false);
    } else {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="outline" size="sm">
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Update Category' : 'Create Category'}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>

            <Input
              id="name"
              name="name"
              defaultValue={category?.name}
              placeholder="Camping"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              defaultValue={category?.description}
              placeholder="Write a short description..."
              rows={5}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
