import { Suspense } from 'react';

import { CategoryList } from '../_components/category/category-list';
import CategorySearch from '../_components/category/category-search';
import { CategorySkeleton } from '../_components/category/category-skeleton';

const CategoryPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Browse Categories</h1>

          <p className="text-muted-foreground">
            Discover sports and outdoor equipment by category.
          </p>
        </div>
        <div className="w-full max-w-sm sm:max-w-xs">
          <CategorySearch />
        </div>
      </div>

      <Suspense fallback={<CategorySkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
