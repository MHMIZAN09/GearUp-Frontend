import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Home, ReceiptText, ShieldCheck, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { PaymentResultBackGuard } from './payment-result-back-guard';

type PaymentResultAction = {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
};

type PaymentResultProps = {
  actions: PaymentResultAction[];
  description: string;
  headline: string;
  icon: LucideIcon;
  iconBackgroundClassName: string;
  iconClassName: string;
  orderId?: string;
  statusDotClassName: string;
  statusLabel: string;
  summary: string;
  title: string;
};

export function PaymentResult({
  actions,
  description,
  headline,
  icon: Icon,
  iconBackgroundClassName,
  iconClassName,
  orderId,
  statusDotClassName,
  statusLabel,
  summary,
  title,
}: PaymentResultProps) {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center bg-background px-4 py-10 sm:px-6 lg:px-8">
      <PaymentResultBackGuard />
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

          <Badge variant="outline" className="mb-6 gap-1.5">
            <span className={`size-2 rounded-full ${statusDotClassName}`} />
            {statusLabel}
          </Badge>

          <div
            className={`mb-6 flex size-16 items-center justify-center rounded-lg ${iconBackgroundClassName}`}
          >
            <Icon className={`size-9 ${iconClassName}`} />
          </div>

          <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">{title}</p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((action, index) => {
              const ActionIcon = action.icon;

              return (
                <Button
                  key={`${action.href}-${action.label}`}
                  asChild
                  className="h-9 gap-2 px-4 text-sm"
                  size="lg"
                  variant={action.variant ?? (index === 0 ? 'default' : 'outline')}
                >
                  <Link href={action.href}>
                    <ActionIcon className="size-4" />
                    {action.label}
                    {index === 0 ? <ArrowRight className="size-4" /> : null}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        <Card className="rounded-none border-0 border-t bg-muted/30 py-0 ring-0 lg:border-l lg:border-t-0">
          <CardContent className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Payment summary</p>
                <p className="mt-2 text-lg font-semibold">{summary}</p>
              </div>

              <div className="space-y-3 rounded-md border bg-background/70 p-4">
                <div className="flex items-start gap-3">
                  <ReceiptText className="mt-0.5 size-4 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">Order ID</p>
                    <p className="mt-1 break-all font-mono text-sm">{orderId || 'Not available'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t pt-3">
                  <ShieldCheck className="mt-0.5 size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Account area</p>
                    <p className="mt-1 text-sm">Your rentals dashboard has the latest order status.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/">
                  <Home className="size-4" />
                  Home
                </Link>
              </Button>
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/gear">
                  <ShoppingBag className="size-4" />
                  Browse gear
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
