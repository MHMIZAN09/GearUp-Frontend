'use client';

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Boxes } from 'lucide-react';
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

import { updateGearStock } from '../../_actions/gear.actions';

type UpdateGearStockDialogProps = {
  gear: {
    id: string;
    name: string;
    quantityAvailable?: number;
    quantityTotal?: number;
  };
};

export function UpdateGearStockDialog({ gear }: UpdateGearStockDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateGearStock.bind(null, gear.id),
    null,
  ) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || 'Stock updated successfully');
      router.refresh();
      setOpen(false);
    } else {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Boxes className="mr-2 h-4 w-4" />
          Stock
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="space-y-1">
            <p className="font-medium">{gear.name}</p>
            <p className="text-muted-foreground">
              Current: {gear.quantityAvailable ?? 0} / {gear.quantityTotal ?? 0}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`quantity-${gear.id}`}>Available Quantity</Label>
            <Input
              id={`quantity-${gear.id}`}
              name="quantity"
              type="number"
              min="0"
              max={gear.quantityTotal}
              step="1"
              defaultValue={gear.quantityAvailable}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending ? 'Saving...' : 'Update Stock'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
