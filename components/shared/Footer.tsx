import { Mail, MapPin, PackageCheck, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Browse Gear', href: '/gear' },
      { label: 'Categories', href: '/category' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'About GearUp', href: '/about' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'My Rentals', href: '/dashboard/rentals' },
      { label: 'My Payments', href: '/dashboard/payments' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Rental Policy', href: '/rental-policy' },
      { label: 'Provider Info', href: '/providers' },
    ],
  },
];

const servicePoints = [
  { label: 'Verified providers', icon: ShieldCheck },
  { label: 'Secure payments', icon: PackageCheck },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Left Section */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <PackageCheck className="size-5" />
              </span>
              <span className="text-xl font-bold tracking-tight">GearUp</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Rent trusted sports and outdoor equipment from verified providers, manage bookings,
              and track payments from one simple platform.
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              <a
                href="mailto:support@gearup.com"
                className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                support@gearup.com
              </a>

              <a
                href="tel:+8801700000000"
                className="flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4" />
                +880 1700 000 000
              </a>

              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" />
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {servicePoints.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium"
                  >
                    <Icon className="size-3.5 text-primary" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-semibold">{group.title}</h2>

                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p> &copy; {new Date().getFullYear()} GearUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
