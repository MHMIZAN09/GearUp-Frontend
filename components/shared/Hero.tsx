import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  PackageCheck,
  Search,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const trustPoints = [
  { icon: ShieldCheck, label: 'Verified providers', color: 'text-emerald-400' },
  { icon: PackageCheck, label: 'Secure payments', color: 'text-blue-300' },
  { icon: Star, label: 'Quality equipment', color: 'text-amber-300' },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-zinc-950 text-white shadow-2xl shadow-primary/10">
      <Image
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=85"
        alt="Friends preparing for an outdoor adventure"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,9,11,0.96)_0%,rgba(9,9,11,0.82)_42%,rgba(9,9,11,0.32)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-black/20" />
      <div className="absolute -left-24 -top-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -bottom-36 right-0 -z-10 size-[28rem] rounded-full bg-sky-500/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-md">
            <BadgeCheck className="size-4 text-emerald-400" />
            Bangladesh&apos;s trusted gear rental marketplace
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Gear up for
            <span className="block text-primary">what&apos;s next.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
            Rent the equipment you need for camping, cycling, fitness, and every outdoor plan.
            Discover trusted providers, book with confidence, and adventure without the cost of
            ownership.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" asChild className="h-11 px-5 text-sm shadow-lg shadow-primary/25">
              <Link href="/gear">
                <Search className="mr-2 size-4" />
                Find your gear
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-11 border-white/25 bg-white/10 px-5 text-sm text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/register">Become a provider</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6">
            {trustPoints.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-zinc-200">
                <Icon className={`size-4 ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-black/35 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Plan your adventure
                </p>
                <p className="mt-1 text-lg font-semibold">Start with the right gear</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-blue-300">
                <Search className="size-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <MapPin className="size-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Explore from</p>
                  <p className="text-sm font-medium">Trusted local providers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <CalendarDays className="size-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Book for</p>
                  <p className="text-sm font-medium">The dates that work for you</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary/15 p-4">
              <Truck className="size-5 shrink-0 text-blue-300" />
              <p className="text-sm leading-5 text-blue-100">
                Simple booking, transparent pricing, memorable adventures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
