/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Pagination from '@/components/shared/Pagination';
import { getAllCategories } from '@/service/category/category.service';

import { getMyGears } from '../../_actions/gear.actions';

import { DeleteGearButton } from './delete-gear-button';
import { GearFormDialog } from './gear-form-dialog';
import { UpdateGearStatusDialog } from './update-gear-status-dialog';
import { UpdateGearStockDialog } from './update-gear-stock-dialog';

export async function GearTable() {
  const [result, categoriesResult] = await Promise.all([getMyGears(), getAllCategories()]);
  const categories = categoriesResult?.success ? categoriesResult.data : [];

  if (!result?.data?.length) {
    return (
      <div className="rounded-xl border py-20 text-center">
        <h3 className="text-xl font-semibold">No Gears Found</h3>

        <p className="mt-2 text-muted-foreground">Create your first gear.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>

              <TableHead>Name</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Brand</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Stock</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Created</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result.data.map((gear: any) => (
              <TableRow key={gear.id}>
                <TableCell>
                  <Image
                    src={gear.imageUrl}
                    alt={gear.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </TableCell>

                <TableCell className="font-semibold">{gear.name}</TableCell>

                <TableCell>{gear.category?.name}</TableCell>

                <TableCell>{gear.brand}</TableCell>

                <TableCell>৳{gear.pricePerDay}</TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {gear.quantityAvailable} / {gear.quantityTotal}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={gear.status === 'AVAILABLE' ? 'default' : 'destructive'}>
                    {gear.status}
                  </Badge>
                </TableCell>

                <TableCell>{new Date(gear.createdAt).toLocaleDateString()}</TableCell>

                <TableCell>
                  <div className="flex flex-wrap justify-end gap-2">
                    <GearFormDialog mode="edit" gear={gear} categories={categories} />

                    <UpdateGearStockDialog gear={gear} />

                    <UpdateGearStatusDialog gear={gear} />

                    <DeleteGearButton id={gear.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination meta={result.meta} />
    </>
  );
}
