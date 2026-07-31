/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button';
import { Compass, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon Container */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <Compass className="h-10 w-10 text-primary animate-spin-slow" />
      </div>

      {/* Badge */}
      <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">
        404 Page Not Found
      </span>

      {/* Heading & Description */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
        Looks like you're off the trail!
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed text-sm sm:text-base">
        The gear listing, category, or page you are looking for doesn't exist, has been moved, or is
        temporarily unavailable.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/gear">
            <Search className="h-4 w-4" />
            Browse Available Gear
          </Link>
        </Button>
      </div>
    </div>
  );
}
