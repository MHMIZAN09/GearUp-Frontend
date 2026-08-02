import { Boxes } from 'lucide-react';

import Pagination from '../../../../components/shared/Pagination';
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
        <div className="flex items-center justify-between rounded-xl border bg-card p-6">
          <div>
            <h1 className="text-3xl font-bold">Gear Management</h1>
            <p className="text-muted-foreground">View all gears available in the system.</p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border px-5 py-3">
            <Boxes className="h-6 w-6 text-primary" />

            <div>
              <p className="text-xs text-muted-foreground">Total Gears</p>

              <p className="text-2xl font-bold">{result.meta.total}</p>
            </div>
          </div>
        </div>

        <GearTable gears={result.data} />
      </div>
      <Pagination meta={result.meta} />
    </>
  );
};

export default DashboardGearPage;
