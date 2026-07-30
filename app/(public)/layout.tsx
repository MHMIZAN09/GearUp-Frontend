import { Navbar } from '@/components/shared/Navbar';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
