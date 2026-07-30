import { Suspense } from 'react';
import { CategoryFormDialog } from '../../_components/category/category-form-dialog';
import { CategoryList } from '../../_components/category/category-list';
import { CategoryTableSkeleton } from '../../_components/category/category-table-skeleton';

export const metadata = {
  title: 'Manage Categories',
};

const CategoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-4 ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>

          <p className="text-muted-foreground">
            Create, edit, and manage all equipment categories.
          </p>
        </div>

        <CategoryFormDialog mode="create" />
      </div>

      {/* Category Table */}
      <Suspense fallback={<CategoryTableSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;
