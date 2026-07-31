import {
  ArrowRight,
  Boxes,
  CalendarDays,
  CheckCircle2,
  Package,
  Store,
  Tag,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryById } from '@/service/category/category.service';

interface CategoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface CategoryGearItem {
  id: string;
  name: string;
  description: string;
  brand: string;
  imageUrl: string;
  pricePerDay: string;
  quantityTotal: number;
  quantityAvailable: number;
  status: string;
  provider: {
    id: string;
    name: string;
  };
}

interface CategoryDetails {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  providerCount: number;
  _count: {
    gearItems: number;
  };
  gearItems: CategoryGearItem[];
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

const getAvailabilityPercent = (available: number, total: number) => {
  if (!total) {
    return 0;
  }

  return Math.min(100, Math.round((available / total) * 100));
};

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id } = await params;

  const result = await getCategoryById(id);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const category = result.data as CategoryDetails;
  const gearItems = category.gearItems ?? [];
  const availableItems = gearItems.filter((gear) => gear.status === 'AVAILABLE').length;

  return (
    <main className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12">
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full px-3 py-1">Category</Badge>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {availableItems} available now
                </Badge>
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {category.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-10 rounded-full px-5">
                  <a href="#category-gear">
                    Browse gear
                    <ArrowRight />
                  </a>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-10 rounded-full px-5">
                  <Link href="/gear">View all gear</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Boxes className="size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{category._count.gearItems}</p>
                    <p className="text-sm text-muted-foreground">Total gear items</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <Store className="size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{category.providerCount}</p>
                    <p className="text-sm text-muted-foreground">Trusted providers</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-background p-5 sm:col-span-2 lg:col-span-1">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 text-sky-600" />
                    <div>
                      <p className="font-semibold">{formatDate(category.createdAt)}</p>
                      <p className="text-sm text-muted-foreground">Created</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-amber-600" />
                    <div>
                      <p className="font-semibold">{formatDate(category.updatedAt)}</p>
                      <p className="text-sm text-muted-foreground">Last updated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="category-gear" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="secondary" className="mb-3 rounded-full">
                {gearItems.length} item{gearItems.length === 1 ? '' : 's'}
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight">Available {category.name} gear</h2>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Compare providers, daily pricing, and live stock before choosing your rental.
              </p>
            </div>
          </div>

          {gearItems.length === 0 ? (
            <div className="rounded-2xl border bg-card px-6 py-16 text-center">
              <Package className="mx-auto size-10 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No gear listed yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                This category is ready, but providers have not added rental items here yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {gearItems.map((gear) => {
                const availabilityPercent = getAvailabilityPercent(
                  gear.quantityAvailable,
                  gear.quantityTotal,
                );

                return (
                  <Card
                    key={gear.id}
                    className="group p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={gear.imageUrl}
                        alt={gear.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
                        <Badge className="rounded-full bg-background/90 text-foreground hover:bg-background">
                          {category.name}
                        </Badge>
                        <Badge
                          variant={gear.status === 'AVAILABLE' ? 'default' : 'destructive'}
                          className="rounded-full"
                        >
                          {gear.status}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="line-clamp-1 text-xl font-bold">{gear.name}</h3>
                          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <Tag className="size-4" />
                            <span className="truncate">{gear.brand}</span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-2xl font-bold text-primary">৳{gear.pricePerDay}</p>
                          <p className="text-xs text-muted-foreground">per day</p>
                        </div>
                      </div>

                      <p className="mt-4 line-clamp-3 min-h-16 text-sm leading-6 text-muted-foreground">
                        {gear.description}
                      </p>

                      <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Stock availability</span>
                          <span className="text-muted-foreground">
                            {gear.quantityAvailable}/{gear.quantityTotal}
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${availabilityPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-sm">
                        <UserRound className="size-4 text-muted-foreground" />
                        <span className="truncate font-medium">{gear.provider.name}</span>
                      </div>

                      <Button asChild className="mt-6 h-10 w-full rounded-full" size="lg">
                        <Link href={`/gear/${gear.id}`}>
                          View details
                          <ArrowRight />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
