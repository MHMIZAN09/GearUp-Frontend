import { ArrowUpRight, Boxes, PackageCheck, Tag, UserRound } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const getAvailabilityPercent = (available: number, total?: number) => {
  if (!total) {
    return available > 0 ? 100 : 0;
  }

  return Math.min(100, Math.round((available / total) * 100));
};

interface GearCardProps {
  gear: {
    id: string;
    name: string;
    description: string;
    brand: string;
    imageUrl: string;
    pricePerDay: string;
    quantityTotal?: number;
    quantityAvailable: number;
    status: string;
    category: {
      name: string;
    };
    provider: {
      name: string;
    };
  };
}

export function GearCard({ gear }: GearCardProps) {
  const availabilityPercent = getAvailabilityPercent(gear.quantityAvailable, gear.quantityTotal);
  const isAvailable = gear.status === 'AVAILABLE';

  return (
    <Card className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[1.15] overflow-hidden bg-muted">
        <img
          src={gear.imageUrl}
          alt={gear.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <Badge className="rounded-full bg-background/90 text-foreground hover:bg-background">
            {gear.category.name}
          </Badge>

          <Badge variant={isAvailable ? 'default' : 'destructive'} className="rounded-full">
            {gear.status}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="line-clamp-1 text-2xl font-bold text-white">{gear.name}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
            <Tag className="size-4" />
            <span className="truncate">{gear.brand}</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-[310px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Daily rental</p>
            <p className="mt-1 text-3xl font-bold text-primary">৳{gear.pricePerDay}</p>
          </div>

          <div className="rounded-xl border bg-muted/30 px-3 py-2 text-right">
            <div className="flex items-center justify-end gap-1 font-semibold">
              <PackageCheck className="size-4 text-emerald-600" />
              {gear.quantityAvailable}
            </div>
            <p className="text-xs text-muted-foreground">available</p>
          </div>
        </div>

        <p className="mt-5 line-clamp-3 min-h-[72px] text-sm leading-6 text-muted-foreground">
          {gear.description}
        </p>

        <div className="mt-5 rounded-xl border bg-background p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Boxes className="size-4 text-primary" />
              Stock
            </span>
            <span className="text-muted-foreground">
              {gear.quantityAvailable}
              {gear.quantityTotal ? `/${gear.quantityTotal}` : ''}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${availabilityPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="size-4" />
          <span className="truncate font-medium text-foreground">{gear.provider.name}</span>
        </div>

        <div className="mt-auto pt-6">
          <Button asChild className="h-10 w-full rounded-full" size="lg">
            <Link href={`/gear/${gear.id}`} className="flex items-center justify-center gap-2">
              Open rental sheet
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
