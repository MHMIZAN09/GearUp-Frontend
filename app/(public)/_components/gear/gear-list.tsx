/* eslint-disable @typescript-eslint/no-explicit-any */
import { PackageSearch } from 'lucide-react';

import { getAllGears } from '@/service/gear/gear.service';

import Pagination from '../../../../components/shared/Pagination';
import { GearCard } from './gear-card';

export async function GearList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getAllGears({ query });

  const gears = result?.data ?? [];
  const meta = result.meta;


  if (!gears?.length) {
    return (
      <div className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PackageSearch className="size-7" />
        </div>

        <h3 className="mt-5 text-xl font-semibold">No gears found</h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn&apos;t find any gears matching your search. Please try again with different
          keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {gears.map((gear: any) => (
          <GearCard key={gear.id} gear={gear} />
        ))}
      </div>

      <Pagination meta={meta} />
    </div>
  );
}
