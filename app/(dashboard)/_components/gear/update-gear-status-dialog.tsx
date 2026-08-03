'use client';

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { RefreshCw } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { updateGearStatus } from '../../_actions/gear.actions';

const statuses = ['AVAILABLE', 'UNAVAILABLE', 'OUT_OF_STOCK'] as const;

type GearStatus = (typeof statuses)[number];

type UpdateGearStatusDialogProps = {
  gear: {
    id: string;
    name: string;
    status?: GearStatus;
  };
};

export function UpdateGearStatusDialog({ gear }: UpdateGearStatusDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<GearStatus>(gear.status ?? 'AVAILABLE');
  const [state, formAction, pending] = useActionState(
    updateGearStatus.bind(null, gear.id),
    null,
  ) as any;

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || 'Status updated successfully');
      router.refresh();
      setOpen(false);
    } else {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state, router]);

  useEffect(() => {
    if (!open) {
      setStatus(gear.status ?? 'AVAILABLE');
    }
  }, [open, gear.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Status
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="space-y-1">
            <p className="font-medium">{gear.name}</p>
            <p className="text-muted-foreground">Choose the current listing status.</p>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <input type="hidden" name="status" value={status} />
            <Select value={status} onValueChange={(value) => setStatus(value as GearStatus)}>
              <SelectTrigger className="h-7 w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending ? 'Saving...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
