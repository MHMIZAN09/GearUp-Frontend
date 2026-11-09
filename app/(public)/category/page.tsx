import { BadgeCheck, Boxes, Compass, Search } from 'lucide-react';
import { Suspense } from 'react';

import CategorySearch from '../_components/category/category-search';
import { CategoryList } from '../_components/category/category-list';
import { CategorySkeleton } from '../_components/category/category-skeleton';

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;
  const hasSearch = Boolean(search.searchTerm);

  return (
    <main className="bg-background">
      <section className="border-b bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium">
                  <Compass className="size-4 text-primary" />
                  Explore GearUp
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium">
                  <BadgeCheck className="size-4 text-emerald-600" />
                  Curated categories
                </span>
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find gear by category.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Explore sports, outdoor, and travel equipment organized to help you find the right
                rental faster.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Search className="size-4 text-primary" />
                Search categories
              </div>
              <CategorySearch />
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-background p-3">
                  <p className="text-2xl font-bold">Easy</p>
                  <p className="text-muted-foreground">to discover</p>
                </div>
                <div className="rounded-xl border bg-background p-3">
                  <p className="text-2xl font-bold">Local</p>
                  <p className="text-muted-foreground">providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-10">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Boxes className="size-4" />
              {hasSearch ? 'Filtered categories' : 'All categories'}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Category collection</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Choose a category to compare available gear, providers, and daily rental pricing.
            </p>
          </div>
        </div>

        <Suspense fallback={<CategorySkeleton />}>
          <CategoryList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
