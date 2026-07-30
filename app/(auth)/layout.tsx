const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default AuthLayout;
