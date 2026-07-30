'use client';

import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import EditProfileDialog from './edit-profile-dialog';
import ProfileField from './profile-field';
import ProfileHeader, { IUserProfile } from './profile-header';

interface ProfileCardProps {
  user: IUserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [open, setOpen] = useState(false);
  console.log('user', user);
  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <ProfileHeader user={user} onEdit={() => setOpen(true)} />

        {/* Information */}
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 md:grid-cols-2">
              <ProfileField label="Full Name" value={user.name} icon={null} />

              <ProfileField
                label="Email Address"
                value={user.email}
                icon={<Mail className="h-4 w-4" />}
              />

              <ProfileField
                label="Contact Number"
                value={user.contactNumber}
                emptyText="Not Added"
                icon={<Phone className="h-4 w-4" />}
              />

              <ProfileField
                label="Address"
                value={user.address}
                emptyText="Not Added"
                icon={<MapPin className="h-4 w-4" />}
              />

              <ProfileField
                label="Role"
                value={user.role}
                icon={<ShieldCheck className="h-4 w-4" />}
              />

              <ProfileField
                label="Status"
                value={user.status}
                icon={<ShieldCheck className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileDialog open={open} onOpenChange={setOpen} user={user} />
    </>
  );
}
