import Pagination from '@/components/shared/Pagination';
import { Badge } from '@/components/ui/badge';

import { getProviderRentals } from '../../_actions/rental.actions';
import { ProviderRentalList } from '../../_components/rentals/provider-rental-list';

const ProviderRentalsPage = async () => {
  const result = await getProviderRentals();
  const rentals = result.success ? result.data : [];
  const pendingCount = rentals.filter((rental: { status: string }) => rental.status === 'PENDING').length;
  const confirmedCount = rentals.filter(
    (rental: { status: string }) => rental.status === 'CONFIRMED',
  ).length;

  if (!result.success) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
          <p className="text-muted-foreground">Confirm requests and manage rental status.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Pending {pendingCount}</Badge>
          <Badge>Confirmed {confirmedCount}</Badge>
          <Badge variant="outline">Total {result.meta?.total ?? rentals.length}</Badge>
        </div>
      </div>

      <ProviderRentalList rentals={rentals} />

      {result.meta ? <Pagination meta={result.meta} /> : null}
    </div>
  );
};

export default ProviderRentalsPage;
