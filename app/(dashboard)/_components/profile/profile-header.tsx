'use client';

import { Pencil } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string | null;
  address: string | null;
  profilePhoto: string | null;
  role: 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
  status: 'ACTIVE' | 'BLOCKED';
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileHeaderProps {
  user: IUserProfile;
  onEdit?: () => void;
}

export default function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  // console.log('user', user);
  return (
    <div className="flex flex-col justify-between gap-6 rounded-3xl border bg-card p-6 shadow-sm md:flex-row md:items-center">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Avatar className="h-24 w-24 border-4 border-primary/10">
          <AvatarImage src={user.profilePhoto ?? undefined} alt={user.name} />
          <AvatarFallback className="text-2xl font-bold">
            {' '}
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>

          <p className="text-muted-foreground">{user.email}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{user.role}</Badge>

            <Badge variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}>
              {user.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Right */}
      <Button onClick={onEdit}>
        <Pencil className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  );
}
