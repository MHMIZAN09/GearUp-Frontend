import { CalendarRange } from 'lucide-react';
import Pagination from '../../../../components/shared/Pagination';
import { getAllRentals } from '../../_actions/rental.actions';
import RentalList from '../../_components/rentals/rental-list';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';

export default async function AdminRentalsPage() {
  const result = await getAllRentals();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Order operations"
        title="Rental orders"
        description="Track booking periods, rental items, payments, and fulfillment status across the marketplace."
        icon={CalendarRange}
        metric={{ label: 'Total orders', value: result.meta.total }}
      />

      <RentalList rentals={result.data} />
      <Pagination meta={result.meta} />
    </div>
  );
}
