import { Suspense } from 'react';
import { GearSkeleton } from '../_components/gear/gear-skeleton';
import { GearList } from '../_components/gear/gear-list';

export default function GearPage() {
  return (
    <div className="container mx-auto space-y-8 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sports Gears</h1>

          <p className="text-muted-foreground">Browse all available sports equipment.</p>
        </div>
      </div>

      <Suspense fallback={<GearSkeleton />}>
        <GearList />
      </Suspense>
    </div>
  );
}
