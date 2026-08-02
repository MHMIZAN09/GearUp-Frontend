'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { updateRentalStatusByAdmin } from '@/app/(dashboard)/_actions/rental.actions';
import { toast } from 'sonner';

type Props = {
  rentalId: string;
  currentStatus: string;
};

const statuses = ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];

export default function UpdateRentalStatus({ rentalId, currentStatus }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const res = await updateRentalStatusByAdmin(rentalId, value);

      if (res.success) {
        toast.success('Rental status updated');
        router.refresh();
      } else {
        toast.error(res.message ?? 'Something went wrong');
      }
    });
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[170px]">
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
  );
}
