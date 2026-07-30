import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/service/getMe';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;
