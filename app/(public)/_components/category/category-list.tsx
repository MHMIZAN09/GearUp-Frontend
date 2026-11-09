import { FolderSearch, RotateCcw } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Pagination from '../../../../components/shared/Pagination';
import { getAllCategories } from '../../../../service/category/category.service';
import CategoryCard from './category-card';

type Category = {
  id: string;
  name: string;
  description?: string;
  gearItemCount?: number;
  _count?: {
    gearItems: number;
  };
};

export async function CategoryList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllCategories({ query });
  const meta = result.meta;
  const categories: Category[] = result.success ? result.data : [];

  if (!categories.length) {
    return (
      <div className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FolderSearch className="size-8" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          No categories available
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">We couldn&apos;t find any category</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          There are no sports gear categories to show right now. Please try again later or browse
          all available gear instead.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="gap-2 rounded-full">
            <Link href="/category">
              <RotateCcw className="size-4" />
              Try again
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/gear">Browse all gear</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            gearCount={category.gearItemCount ?? category._count?.gearItems ?? 0}
          />
        ))}
      </div>
      <Pagination meta={meta} />
    </>
  );
}
