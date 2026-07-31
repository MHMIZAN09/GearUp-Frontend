/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllCategories } from '@/service/category/category.service';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';

import Pagination from '../../../../components/shared/Pagination';
import { CategoryFormDialog } from './category-form-dialog';
import DeleteCategoryButton from './DeleteCategoryButton';

export async function CategoryList() {
  const result = await getAllCategories();

  if (!result?.data?.length) {
    return (
      <div className="rounded-xl border py-20 text-center">
        <h3 className="text-xl font-semibold">No Categories Found</h3>

        <p className="mt-2 text-muted-foreground">Create your first category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Description</TableHead>

              <TableHead>Gear</TableHead>

              <TableHead>Created</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {result?.data?.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className="font-semibold">{category.name}</TableCell>

                <TableCell className="max-w-sm truncate text-muted-foreground">
                  {category.description || '-'}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{category._count.gearItems}</Badge>
                </TableCell>

                <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <CategoryFormDialog mode="edit" category={category} />

                    <DeleteCategoryButton id={category.id} />
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
