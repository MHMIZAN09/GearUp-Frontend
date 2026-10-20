import { ArrowUpRight, Boxes, Compass } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { getAllCategories } from '@/service/category/category.service';

type Category = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  _count?: {
    gearItems?: number;
  };
};

export default async function BrowseCategories() {
  const result = await getAllCategories();
  const categories: Category[] = result?.success && Array.isArray(result.data) ? result.data : [];

  return (
    <section aria-labelledby="browse-categories-title" className="mx-auto max-w-6xl py-4">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <Compass className="size-4" />
            Find your fit
          </div>
          <h2 id="browse-categories-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by category
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            From weekend trails to serious training, find equipment for the way you move.
          </p>
        </div>
        <Link
          href="/category"
          className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View all categories
          <ArrowUpRight className="ml-1 size-4" />
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
          <Boxes className="mx-auto size-8 text-muted-foreground" />
          <h3 className="mt-4 font-semibold">Categories are coming soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon to explore gear by category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative isolate min-h-64 overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {category.imageUrl ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-muted to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-200">
                      {category.description || 'Explore available gear in this category.'}
                    </p>
                    <Badge className="mt-3 gap-1 border-white/20 bg-white/15 text-white hover:bg-white/20">
                      <Boxes className="size-3.5" />
                      {category._count?.gearItems ?? 0} gear items
                    </Badge>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur transition-colors group-hover:bg-primary">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
