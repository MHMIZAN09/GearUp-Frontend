import {
  ArrowRight,
  Backpack,
  CalendarCheck,
  CreditCard,
  RotateCcw,
  Search,
  ShieldCheck,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Find your gear',
    description:
      'Explore verified sports and outdoor equipment, compare providers, prices, and availability, then choose what fits your adventure.',
  },
  {
    number: '02',
    icon: CreditCard,
    title: 'Book and pay securely',
    description:
      'Select your rental dates, review the booking details, and complete payment securely. Your booking is confirmed once the provider approves it.',
  },
  {
    number: '03',
    icon: Backpack,
    title: 'Enjoy your adventure',
    description:
      'Pick up your gear or arrange delivery with the provider, enjoy your trip, and return everything on time in the agreed condition.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="mx-auto max-w-6xl py-4">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <CalendarCheck className="size-5" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Simple from start to finish
        </p>
        <h2 id="how-it-works-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Get the gear you need in three easy steps and spend more time enjoying your adventure.
        </p>
      </div>

      <div className="relative grid gap-5 md:grid-cols-3 md:gap-6">
        <div className="absolute left-[16%] right-[16%] top-16 hidden border-t-2 border-dashed border-primary/20 md:block" />

        {steps.map(({ number, icon: Icon, title, description }, index) => (
          <article
            key={number}
            className="group relative rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7"
          >
            <div className="relative mb-6 flex items-center justify-between">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-7" />
              </div>
              <span className="text-5xl font-black tracking-tight text-muted/80">{number}</span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <span>Step {index + 1}</span>
              {index < steps.length - 1 && <ArrowRight className="size-3.5 md:hidden" />}
            </div>
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="flex gap-4 rounded-3xl border bg-gradient-to-br from-primary/10 via-muted/30 to-background p-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <RotateCcw className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold">Return with confidence</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Return gear by the agreed date and follow the provider&apos;s instructions. Late
              returns or damage may result in additional charges.
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-3xl border bg-gradient-to-br from-emerald-500/10 via-muted/30 to-background p-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold">A booking process you can trust</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Choose dates, confirm provider terms, pay securely, and track every booking detail
              from your GearUp dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
