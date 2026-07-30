import { Skeleton } from '@/components/ui/skeleton';

export function CategoryTableSkeleton() {
  return (
    <div className="rounded-xl border">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 border-b p-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 border-b p-4 last:border-0">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
