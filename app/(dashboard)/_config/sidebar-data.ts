import { BarChart, Calendar, Folder, LayoutDashboard, Star, User, Users } from 'lucide-react';

export const sidebarItems = {
  ADMIN: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/admin-dashboard',
        icon: LayoutDashboard,
      },

      {
        title: 'Profile',
        url: '/admin-dashboard/profile',
        icon: User,
      },

      {
        title: 'Users',
        url: '/admin-dashboard/users',
        icon: Users,
      },

      {
        title: 'Categories',
        url: '/admin-dashboard/categories',
        icon: Folder,
      },

      {
        title: 'Rentals',
        url: '/admin-dashboard/rentals',
        icon: Calendar,
      },
    ],
  },

  PROVIDER: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/provider-dashboard',
        icon: LayoutDashboard,
      },

      {
        title: 'Profile',
        url: '/provider-dashboard/profile',
        icon: User,
      },

      {
        title: 'My Gear',
        url: '/provider-dashboard/gear',
        icon: Folder,
      },

      {
        title: 'Rentals',
        url: '/provider-dashboard/rentals',
        icon: Calendar,
      },

      {
        title: 'Analytics',
        url: '/provider-dashboard/analytics',
        icon: BarChart,
      },
    ],
  },

  CUSTOMER: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },

      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: User,
      },

      {
        title: 'Bookings',
        url: '/dashboard/bookings',
        icon: Calendar,
      },

      {
        title: 'Reviews',
        url: '/dashboard/reviews',
        icon: Star,
      },
    ],
  },
} as const;
