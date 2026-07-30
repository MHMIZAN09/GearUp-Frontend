import { ArrowRight, Boxes } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string;
  gearCount: number;
}

export default function CategoryCard({ id, name, description, gearCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`} className="block h-full">
      <Card className="group flex h-full flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-6">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{name}</h3>

            <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">
              {description || 'Explore premium sports and outdoor equipment.'}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1">
              <Boxes className="h-3.5 w-3.5" />
              {gearCount} Gear
            </Badge>
          </div>

          {/* Push CTA to bottom */}
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="text-sm font-semibold text-primary">Explore Category</span>

            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
