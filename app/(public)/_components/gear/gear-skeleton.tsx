import { Skeleton } from '@/components/ui/skeleton';

export function GearSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border">
          <Skeleton className="h-56 w-full" />

          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-40" />

            <Skeleton className="h-4 w-full" />

            <Skeleton className="h-4 w-2/3" />

            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
