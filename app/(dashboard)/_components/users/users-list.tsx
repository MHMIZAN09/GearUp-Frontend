'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import DeleteUserButton from './delete-user-button';
import StatusDropdown from './status-dropdown';

type User = {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'BLOCKED';
  profilePhoto: string | null;
  contactNumber: string | null;
  address: string | null;
};

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.profilePhoto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=45`
                      }
                      alt={user.name}
                      width={45}
                      height={45}
                      className="rounded-full object-cover"
                    />

                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{user.contactNumber || '--'}</TableCell>

                <TableCell className="max-w-[220px] truncate">{user.address || '--'}</TableCell>

                <TableCell>
                  <StatusDropdown id={user.id} status={user.status} />
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="outline">
                      <Link href={`/admin-dashboard/users/${user.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    <DeleteUserButton id={user.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
