'use client';

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PackagePlus, PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { createGear, updateGear } from '../../_actions/gear.actions';

export type GearCategory = {
  id: string;
  name: string;
};

export type ProviderGear = {
  id: string;
  name: string;
  description?: string;
  brand?: string;
  imageUrl?: string;
  pricePerDay?: number | string;
  quantityTotal?: number;
  quantityAvailable?: number;
  categoryId?: string;
  category?: GearCategory;
};

type GearFormDialogProps = {
  mode: 'create' | 'edit';
  gear?: ProviderGear;
  categories: GearCategory[];
};

export function GearFormDialog({ mode, gear, categories }: GearFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(gear?.categoryId ?? gear?.category?.id ?? '');

  const action = mode === 'edit' && gear ? updateGear.bind(null, gear.id) : createGear;
  const [state, formAction, pending] = useActionState(action, null) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message || (mode === 'edit' ? 'Gear updated successfully' : 'Gear created successfully'),
      );
      router.refresh();
      setOpen(false);
    } else {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state, mode, router]);

  useEffect(() => {
    if (!open) {
      setCategoryId(gear?.categoryId ?? gear?.category?.id ?? '');
    }
  }, [open, gear]);

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
            <PackagePlus className="mr-2 h-4 w-4" />
            Add Gear
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Update Gear' : 'Create Gear'}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Gear Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={gear?.name}
                placeholder="4 Person Tent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                defaultValue={gear?.brand}
                placeholder="Coleman"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={gear?.description}
              placeholder="Add useful details for renters..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={gear?.imageUrl}
              placeholder="https://example.com/gear.jpg"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day</Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                min="0"
                step="1"
                defaultValue={gear?.pricePerDay}
                placeholder="500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantityTotal">Total Quantity</Label>
              <Input
                id="quantityTotal"
                name="quantityTotal"
                type="number"
                min="1"
                step="1"
                defaultValue={gear?.quantityTotal}
                placeholder="3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <input type="hidden" name="categoryId" value={categoryId} />
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger className="h-7 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending || !categoryId} className="w-full sm:w-auto">
              {pending ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Gear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
