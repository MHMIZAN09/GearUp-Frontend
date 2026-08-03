import { getAllCategories } from '@/service/category/category.service';

import { GearFormDialog } from '../../_components/gear/gear-form-dialog';
import { GearTable } from '../../_components/gear/provider-gear-table';

const GearsPage = async () => {
  const categoriesResult = await getAllCategories();
  const categories = categoriesResult?.success ? categoriesResult.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Gears</h1>

          <p className="text-muted-foreground">Manage your gears, stock, and availability.</p>
        </div>

        <GearFormDialog mode="create" categories={categories} />
      </div>

      <GearTable />
    </div>
  );
};

export default GearsPage;
