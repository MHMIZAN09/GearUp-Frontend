import { ArrowRight, ShieldCheck, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-zinc-900/50">
      {/* Background */}
      <div className="absolute inset-0 -z-20 rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80"
          alt="Outdoor adventure"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/65" />

      {/* Decorative Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="container mx-auto flex min-h-[90vh] max-w-7xl items-center px-14 py-20 ">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Trusted by Outdoor Enthusiasts
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Rent Premium
            <span className="block text-primary">Sports & Outdoor Gear</span>
            For Every Adventure
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            Explore premium camping, cycling, hiking, fitness, and outdoor equipment from trusted
            providers. Book instantly, pay securely, and enjoy your next adventure without the cost
            of ownership.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/gear">
                Browse Gear
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="secondary" asChild>
              <Link href="/categories">Explore Categories</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="mt-1 text-sm text-zinc-300">Gear Items</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="mt-1 text-sm text-zinc-300">Providers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">2.5K+</h3>
              <p className="mt-1 text-sm text-zinc-300">Successful Rentals</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="mt-1 text-sm text-zinc-300">Happy Customers</p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-zinc-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              Verified Providers
            </div>

            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-400" />
              Fast Booking
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Premium Equipment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
