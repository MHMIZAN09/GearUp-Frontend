import Footer from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/service/getMe';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
