'use client';

import { CommandIcon } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { sidebarItems } from '../app/(dashboard)/_config/sidebar-data';

interface IUser {
  name: string;
  email: string;
  profilePhoto: string | null;
  role: 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: IUser }) {
  const navItems = sidebarItems[user.role]?.navMain || [];

  const navItemsForNavMain = navItems.map(({ title, url, icon }) => ({
    title,
    url,
    icon: React.createElement(icon),
  }));

  const safeNavUser = {
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto ?? '',
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">{user.role} Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItemsForNavMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={safeNavUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
