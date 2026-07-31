import { Mail, MapPin, Phone, ShieldCheck, UserCircle } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserById } from '../../../_actions/users.actions';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;

  const result = await getUserById(id);
  console.log('User Details Result:', result);

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const user = result.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Details</h1>
        <p className="text-muted-foreground">View complete information about this user.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-5 p-8 md:flex-row">
          <Image
            src={user?.profilePhoto || ''}
            alt={user.name}
            width={130}
            height={130}
            className="rounded-full border object-cover"
          />

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>

            <Badge variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}>
              {user.status}
            </Badge>

            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <UserCircle className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.contactNumber ?? 'Not Provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{user.address ?? 'Not Provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>

                <Badge variant={user.status === 'ACTIVE' ? 'default' : 'destructive'}>
                  {user.status}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="break-all font-mono text-sm">{user.id}</p>
            </div>

            {user.createdAt && (
              <div>
                <p className="text-sm text-muted-foreground">Joined At</p>

                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            )}

            {user.updatedAt && (
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>

                <p>{new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
