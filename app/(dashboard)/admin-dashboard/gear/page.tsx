import { Boxes } from 'lucide-react';

import Pagination from '../../../../components/shared/Pagination';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';
import { getAllGears } from '../../_actions/gear.actions';
import GearTable from '../../_components/gear/gear-table';

const DashboardGearPage = async () => {
  const result = await getAllGears();

  if (!result.success) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Inventory management"
          title="Gear management"
          description="Review every listed item, monitor inventory, and keep the marketplace ready for customers."
          icon={Boxes}
          metric={{ label: 'Total gear items', value: result.meta.total }}
        />
        <GearTable gears={result.data} />
      </div>
      <Pagination meta={result.meta} />
    </>
  );
};

export default DashboardGearPage;
