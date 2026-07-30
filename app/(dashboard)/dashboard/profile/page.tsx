import { getUserProfile } from '../../_actions/profile.actions';
import ProfileCard from '../../_components/profile/profile-card';

export default async function ProfilePage() {
  const result = await getUserProfile();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <ProfileCard user={result.data} />
    </div>
  );
}
