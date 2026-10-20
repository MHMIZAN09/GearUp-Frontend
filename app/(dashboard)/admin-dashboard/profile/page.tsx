import { UserRound } from 'lucide-react';
import { getUserProfile } from '../../_actions/profile.actions';
import ProfileCard from '../../_components/profile/profile-card';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';

export default async function ProfilePage() {
  const result = await getUserProfile();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        eyebrow="Account settings"
        title="Admin profile"
        description="Manage your administrator contact details and account information."
        icon={UserRound}
      />
      <ProfileCard user={result.data} />
    </div>
  );
}
