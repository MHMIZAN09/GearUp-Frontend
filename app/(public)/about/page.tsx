/* eslint-disable react/no-unescaped-entities */
import { ArrowRight, Award, Clock3, Dumbbell, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: ShieldCheck,
    title: 'Trusted Providers',
    description:
      'Every provider is verified to ensure quality equipment and a safe rental experience.',
  },
  {
    icon: Clock3,
    title: 'Fast Booking',
    description: 'Browse, select your rental dates, and confirm your booking in just a few clicks.',
  },
  {
    icon: Award,
    title: 'Premium Equipment',
    description: 'Access high-quality sports and outdoor gear without the cost of ownership.',
  },
];

const values = [
  {
    title: 'Accessibility',
    description: 'We make premium sports equipment accessible to everyone.',
  },
  {
    title: 'Community',
    description: 'Connecting adventurers, athletes, and trusted rental providers.',
  },
  {
    title: 'Sustainability',
    description: 'Renting reduces waste and encourages responsible equipment usage.',
  },
];

const stats = [
  {
    value: '500+',
    label: 'Gear Items',
  },
  {
    value: '100+',
    label: 'Trusted Providers',
  },
  {
    value: '2,500+',
    label: 'Successful Rentals',
  },
  {
    value: '98%',
    label: 'Customer Satisfaction',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-24 px-4 py-16">
      {/* Hero */}
      <section className="text-center">
        <Badge className="mb-5">
          <Sparkles className="mr-2 h-4 w-4" />
          About GearUp
        </Badge>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight">
          Making Sports & Outdoor Adventures
          <span className="text-primary"> More Accessible</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          GearUp is a modern sports and outdoor equipment rental platform that connects customers
          with trusted providers. Whether you're planning a weekend camping trip or training for
          your next adventure, we help you rent the right equipment quickly, securely, and
          affordably.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/gear">
              Browse Gear
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Explore Categories</Link>
          </Button>
        </div>
      </section>

      {/* Story */}
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="mb-4">Our Story</Badge>

          <h2 className="text-3xl font-bold">Adventure Shouldn't Be Limited by Equipment</h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Purchasing high-quality sports equipment can be expensive, especially for occasional
            use. GearUp was created to solve this problem by connecting customers with trusted
            rental providers.
          </p>

          <p className="mt-4 leading-8 text-muted-foreground">
            From camping tents and mountain bikes to fitness equipment and hiking essentials, our
            platform makes renting simple, affordable, and reliable.
          </p>
        </div>

        <Card className="rounded-3xl">
          <CardContent className="flex h-80 flex-col items-center justify-center gap-5">
            <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
              <Dumbbell className="h-12 w-12 -rotate-45" />
            </div>

            <h3 className="text-2xl font-bold">Rent. Explore. Repeat.</h3>

            <p className="max-w-sm text-center text-muted-foreground">
              Experience premium gear without the commitment of ownership.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section>
        <div className="mb-10 text-center">
          <Badge>Why Choose Us</Badge>

          <h2 className="mt-4 text-3xl font-bold">Built for Adventurers</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="rounded-3xl border bg-muted/40 p-10">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <h3 className="text-4xl font-bold text-primary">{item.value}</h3>

              <p className="mt-2 text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section>
        <div className="mb-10 text-center">
          <Badge>Our Values</Badge>

          <h2 className="mt-4 text-3xl font-bold">What Drives GearUp</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="space-y-3 p-6">
                <Users className="h-8 w-8 text-primary" />

                <h3 className="text-xl font-semibold">{value.title}</h3>

                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
        <h2 className="text-4xl font-bold">Ready for Your Next Adventure?</h2>

        <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
          Explore hundreds of sports and outdoor equipment from trusted providers and start your
          journey today.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link href="/gear">
            Explore Gear
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
