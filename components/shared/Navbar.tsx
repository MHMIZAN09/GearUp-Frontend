'use client';

import { LayoutDashboard, LogOut, Menu, Settings, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '../../service/logout';
import { ModeToggle } from './ThemeToggle';

interface MenuItem {
  title: string;
  url: string;
}

export interface NavbarUserProps {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePhoto: string;
  };
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  user?: NavbarUserProps | null;
  onLogout?: () => void;
}

const defaultUserMenuItems = [
  { label: 'Dashboard', action: '/dashboard', icon: LayoutDashboard },
  { label: 'Settings', action: '/settings', icon: Settings },
];

export const Navbar = ({
  logo = {
    url: '/',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'GearUp Logo',
    title: 'GearUp',
  },
  menu = [
    { title: 'Home', url: '/' },
    { title: 'Browse Gear', url: '/gear' },
    { title: 'Categories', url: '/category' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' },
  ],
  auth = {
    login: { title: 'Login', url: '/login' },
    signup: { title: 'Register', url: '/register' },
  },
  user = null,
  onLogout,
  className,
}: NavbarProps) => {
  const router = useRouter();

  const handleUserMenuAction = (action: string) => {
    router.push(action);
  };

  const handleLogout = async (action: string) => {
    if (action === 'logout') {
      await logout();
      toast.success('Logged out successfully!');
      router.push('/login');
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 py-3 backdrop-blur supports-backdrop-filter:bg-background/60',
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* --- Desktop Navigation --- */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href={logo.url}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <img src={logo.src} className="max-h-7 dark:invert" alt={logo.alt} />
              <span className="text-lg font-bold tracking-tight">{logo.title}</span>
            </Link>

            {/* Desktop Menu */}
            <NavigationMenu>
              <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth & Theme */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {/* Dynamic User Rendering */}
            {user?.success ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer transition-transform hover:scale-105">
                    {user.data?.profilePhoto ? (
                      <img
                        src={user.data.profilePhoto}
                        alt={user.data.name}
                        className="h-9 w-9 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium leading-none">{user.data?.name}</p>
                      <p className="text-xs text-muted-foreground">{user.data?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {defaultUserMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.action}
                        onClick={() => handleUserMenuAction(item.action)}
                        className="cursor-pointer"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => await handleLogout('logout')}
                    className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <div className="flex items-center justify-between lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-7 dark:invert" alt={logo.alt} />
            <span className="text-lg font-bold tracking-tight">{logo.title}</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[300px] flex-col overflow-y-auto">
              <SheetHeader className="mb-4 text-left">
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center gap-2">
                    <img src={logo.src} className="max-h-7 dark:invert" alt={logo.alt} />
                    <span className="text-lg font-bold tracking-tight">{logo.title}</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Menu Links */}
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col space-y-3">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </div>
              </div>

              {/* Mobile Auth & Theme Footer */}
              <div className="mt-auto flex flex-col gap-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Toggle Theme</span>
                  <ModeToggle />
                </div>

                {/* Dynamic Mobile User Rendering */}
                {user?.success ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                      {user.data?.profilePhoto ? (
                        <Image
                          src={user.data.profilePhoto}
                          alt={user.data.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.data?.name}</span>
                        <span className="text-xs text-muted-foreground">{user.data?.email}</span>
                      </div>
                    </div>
                    {defaultUserMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.action}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleUserMenuAction(item.action)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      );
                    })}
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => onLogout?.()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// --- Helper Functions ---

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      key={item.title}
      href={item.url}
      className="block rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
    >
      {item.title}
    </Link>
  );
};
