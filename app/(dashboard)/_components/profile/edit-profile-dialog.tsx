'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserProfile } from '../../_actions/profile.actions';
import { IUserProfile } from './profile-header';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserProfile;
}

export default function EditProfileDialog({ open, onOpenChange, user }: EditProfileDialogProps) {
  const router = useRouter();
  const initialState = {
    success: false,
    statusCode: 0,
    message: '',
  };
  const [state, action, pending] = useActionState(updateUserProfile, initialState);
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      onOpenChange(false);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router, onOpenChange]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>Update your profile information.</DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input id="name" name="name" defaultValue={user.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>

            <Input
              id="contactNumber"
              name="contactNumber"
              defaultValue={user.contactNumber ?? ''}
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Input
              id="address"
              name="address"
              defaultValue={user.address ?? ''}
              placeholder="Dhaka, Bangladesh"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Profile Photo URL</Label>

            <Input
              id="profilePhoto"
              name="profilePhoto"
              defaultValue={user.profilePhoto ?? ''}
              placeholder="https://example.com/avatar.png"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
