'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Gear = {
  id: string;
  name: string;
  description: string;
  brand: string;
  imageUrl: string;
  pricePerDay: string;
  quantityTotal: number;
  quantityAvailable: number;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'OUT_OF_STOCK';
  provider: {
    id: string;
    name?: string;
    fullName?: string;
    businessName?: string;
  };
  category: {
    id: string;
    name: string;
  };
};

type Props = {
  gears: Gear[];
};

export default function GearTable({ gears }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gear</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="text-right">Price / Day</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {gears.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No gears found.
              </TableCell>
            </TableRow>
          ) : (
            gears.map((gear) => (
              <TableRow key={gear.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{gear.name}</p>

                    <p className="font-mono text-xs text-muted-foreground">
                      {gear.id.slice(0, 8)}...
                    </p>
                  </div>
                </TableCell>

                <TableCell>{gear.brand}</TableCell>

                <TableCell>
                  <Badge variant="secondary">{gear.category?.name ?? 'N/A'}</Badge>
                </TableCell>

                <TableCell>
                  {gear.provider?.businessName ||
                    gear.provider?.fullName ||
                    gear.provider?.name ||
                    'N/A'}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  ৳{Number(gear.pricePerDay).toLocaleString()}
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={gear.quantityAvailable === 0 ? 'font-semibold text-red-600' : ''}
                  >
                    {gear.quantityAvailable}
                  </span>

                  <span className="text-muted-foreground"> / {gear.quantityTotal}</span>
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    variant={
                      gear.status === 'AVAILABLE'
                        ? 'default'
                        : gear.status === 'OUT_OF_STOCK'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {gear.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
