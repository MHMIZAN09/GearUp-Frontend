'use client';

import * as React from 'react';
import Link from 'next/link';
import { CommandIcon } from 'lucide-react';

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
}: React.ComponentProps<typeof Sidebar> & {
  user: IUser;
}) {
  const navItems = sidebarItems[user.role]?.navMain ?? [];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href={`/${user.role.toLowerCase()}-dashboard`}>
                <CommandIcon className="size-5" />
                <span className="text-base font-semibold">{user.role} Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto ?? '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
