import { ArrowRight, Package, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GearCardProps {
  gear: {
    id: string;
    name: string;
    description: string;
    brand: string;
    imageUrl: string;
    pricePerDay: string;
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
  return (
    <Card className="group overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={gear.imageUrl}
          alt={gear.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <Badge className="absolute left-4 top-4 rounded-full">{gear.category.name}</Badge>

        <Badge
          variant={gear.status === 'AVAILABLE' ? 'default' : 'destructive'}
          className="absolute right-4 top-4 rounded-full"
        >
          {gear.status}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex min-h-[290px] flex-col p-5">
        {/* Title */}
        <div>
          <h3 className="line-clamp-1 text-xl font-bold">{gear.name}</h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span>{gear.brand}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-3 min-h-[72px] text-sm text-muted-foreground">
          {gear.description}
        </p>

        {/* Price & Stock */}
        <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-muted/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>

            <p className="mt-1 text-2xl font-bold text-primary">৳{gear.pricePerDay}</p>

            <span className="text-xs text-muted-foreground">per day</span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Available</p>

            <div className="mt-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="font-semibold">{gear.quantityAvailable}</span>
            </div>
          </div>
        </div>

        {/* Provider */}
        <div className="mt-5 flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="truncate font-medium">{gear.provider.name}</span>
        </div>

        {/* Button */}
        <div className="mt-auto pt-6">
          <Button asChild className="w-full rounded-xl" size="lg">
            <Link href={`/gear/${gear.id}`} className="flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
