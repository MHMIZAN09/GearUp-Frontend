import Pagination from '../../../../components/shared/Pagination';
import { getAllRentals } from '../../_actions/rental.actions';
import RentalList from '../../_components/rentals/rental-list';

export default async function AdminRentalsPage() {
  const result = await getAllRentals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Orders</h1>

        <p className="text-muted-foreground">Manage all customer rental orders.</p>
      </div>

      <RentalList rentals={result.data} />
      <Pagination meta={result.meta} />
    </div>
  );
}
