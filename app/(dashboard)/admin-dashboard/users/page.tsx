import Pagination from '../../../../components/shared/Pagination';
import { getAdminAllUsers } from '../../_actions/users.actions';
import UserList from '../../_components/users/users-list';

export default async function UsersPage() {
  const result = await getAdminAllUsers();
  console.log('UsersPage result:', result.meta);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage all registered users.</p>
      </div>

      <UserList users={result.data} />
      <Pagination  meta={result.meta}/>
    </div>
  );
}
