import { UsersRound } from 'lucide-react';
import Pagination from '../../../../components/shared/Pagination';
import { getAdminAllUsers } from '../../_actions/users.actions';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';
import UserList from '../../_components/users/users-list';

export default async function UsersPage() {
  const result = await getAdminAllUsers();
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="People & access"
        title="Users"
        description="Manage registered customers and providers, review account status, and keep access healthy."
        icon={UsersRound}
        metric={{ label: 'Registered users', value: result.meta.total }}
      />

      <UserList users={result.data} />
      <Pagination meta={result.meta} />
    </div>
  );
}
