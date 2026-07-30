/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllGears } from '@/service/gear/gear.service';

import { GearCard } from './gear-card';

export async function GearList() {
  const result = await getAllGears();

  const gears = result.data;

  if (!gears?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <h3 className="text-lg font-semibold">No gears found.</h3>

        <p className="max-w-xs text-sm text-muted-foreground">
          We couldn&apos;t find any gears matching your search. Please try again with different
          keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {gears.map((gear: any) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
