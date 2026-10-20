import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  PackagePlus,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: PackagePlus,
    title: 'List your equipment',
    description: 'Showcase your sports and outdoor gear to people looking for their next adventure.',
  },
  {
    icon: BarChart3,
    title: 'Manage rental bookings',
    description: 'Keep your listings, availability, and upcoming rentals organized in one place.',
  },
  {
    icon: WalletCards,
    title: 'Earn from your gear',
    description: 'Turn equipment you already own into an extra income stream on your terms.',
  },
];

export default function ProviderCta() {
  return (
    <section
      aria-labelledby="provider-cta-title"
      className="relative isolate overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-12 text-white shadow-2xl shadow-primary/10 sm:px-10 lg:px-14 lg:py-16"
    >
      <div className="absolute -left-24 -top-28 -z-10 size-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-40 right-0 -z-10 size-[30rem] rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_0%,rgba(59,130,246,0.16),transparent_34%)]" />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-blue-100 backdrop-blur">
            <ShieldCheck className="size-4 text-emerald-400" />
            Built for gear owners
          </div>
          <h2
            id="provider-cta-title"
            className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            Make your gear work harder for you.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            List your equipment on GearUp, reach customers who are ready to explore, and manage
            every rental from one simple provider experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="h-11 px-5 shadow-lg shadow-primary/25">
              <Link href="/register">
                Become a Provider
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <span className="text-sm text-zinc-400">Free to get started</span>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm text-zinc-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" />
              Flexible availability
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" />
              Secure bookings
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Provider workspace
                </p>
                <p className="mt-1 text-lg font-semibold">Your gear, organized</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-blue-300">
                <BarChart3 className="size-5" />
              </div>
            </div>

            <div className="grid gap-3 py-5 sm:grid-cols-3">
              {benefits.map(({ icon: Icon, title }, index) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-primary/15 px-4 py-3">
              <div>
                <p className="text-xs text-blue-200/70">Ready to start earning?</p>
                <p className="mt-1 text-sm font-semibold text-blue-50">Set up your provider profile</p>
              </div>
              <WalletCards className="size-5 text-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
