'use client';

import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  confirmRental,
  updateRentalStatusByProvider,
} from '../../_actions/rental.actions';

type ProviderRentalActionsProps = {
  rentalId: string;
  currentStatus: string;
};

const statuses = ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];

export function ProviderRentalActions({ rentalId, currentStatus }: ProviderRentalActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const canConfirm = currentStatus === 'PENDING';

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await confirmRental(rentalId);

      if (result.success) {
        toast.success(result.message || 'Rental confirmed successfully');
        router.refresh();
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    });
  };

  const handleStatusChange = (status: string) => {
    if (status === currentStatus) return;

    startTransition(async () => {
      const result = await updateRentalStatusByProvider(rentalId, status);

      if (result.success) {
        toast.success(result.message || 'Rental status updated');
        router.refresh();
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      {canConfirm ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" disabled={pending}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm rental request?</AlertDialogTitle>
              <AlertDialogDescription>
                This will approve the rental request and allow the customer to continue with
                payment.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={pending} onClick={handleConfirm}>
                {pending ? 'Confirming...' : 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

      <Select value={currentStatus} onValueChange={handleStatusChange} disabled={pending}>
        <SelectTrigger className="h-6 w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
