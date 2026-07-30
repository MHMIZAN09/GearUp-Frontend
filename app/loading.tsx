import { Loader2 } from 'lucide-react';

const GlobalLoadingPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <span className="text-xl font-bold">G</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">GearUp</h1>
            <p className="text-sm text-muted-foreground">Professional Gear Rental Platform</p>
          </div>
        </div>

        {/* Loader */}
        <div className="flex items-center gap-3 rounded-full border bg-card px-5 py-3 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading, please wait...</span>
        </div>
      </div>
    </main>
  );
};

export default GlobalLoadingPage;
