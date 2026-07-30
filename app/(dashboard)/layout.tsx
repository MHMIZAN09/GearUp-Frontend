import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getUserProfile } from './_actions/profile.actions';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getUserProfile();
  // console.log('result', result);
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar user={result.data} />

        <SidebarInset>
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
          </header>

          <main className="p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
