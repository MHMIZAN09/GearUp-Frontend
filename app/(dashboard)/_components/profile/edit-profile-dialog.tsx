'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  updateUserProfile,
  uploadProfileImage,
} from '../../_actions/profile.actions';
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
  const [imageState, imageAction, imagePending] = useActionState(
    uploadProfileImage,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(user.profilePhoto ?? undefined);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  useEffect(() => {
    if (!imageState) return;

    if (imageState.success) {
      toast.success(imageState.message);
      router.refresh();
    } else if (imageState.message) {
      toast.error(imageState.message);
    }
  }, [imageState, router]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0] ?? null;
    setPreviewUrl(image ? URL.createObjectURL(image) : user.profilePhoto ?? undefined);
  }

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
            <Label htmlFor="profileImage">Profile Image</Label>

            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/10">
                <AvatarImage src={previewUrl} alt="Profile image preview" />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  type="submit"
                  formAction={imageAction}
                  variant="secondary"
                  disabled={imagePending}
                >
                  <ImageUp className="mr-2 h-4 w-4" />
                  {imagePending ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
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
