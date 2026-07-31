'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateUsersStatus } from '../../_actions/users.actions';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  id: string;
  status: 'ACTIVE' | 'BLOCKED';
};

export default function StatusDropdown({ id, status }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('status', value);

      const result = await updateUsersStatus(id, formData);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Select defaultValue={status} disabled={pending} onValueChange={handleChange}>
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
        <SelectItem value="BLOCKED">BLOCKED</SelectItem>
      </SelectContent>
    </Select>
  );
}
