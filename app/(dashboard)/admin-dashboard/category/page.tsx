import { Suspense } from 'react';
import { FolderKanban } from 'lucide-react';
import { CategoryFormDialog } from '../../_components/category/category-form-dialog';
import { CategoryList } from '../../_components/category/category-list';
import { CategoryTableSkeleton } from '../../_components/category/category-table-skeleton';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';

export const metadata = {
  title: 'Manage Categories',
};

const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Catalog management"
        title="Category management"
        description="Create, edit, and organize the categories that help customers find the right equipment."
        icon={FolderKanban}
        action={<CategoryFormDialog mode="create" />}
      />
      <Suspense fallback={<CategoryTableSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;
