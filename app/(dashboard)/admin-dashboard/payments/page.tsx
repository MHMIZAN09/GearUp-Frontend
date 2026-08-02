import Pagination from '../../../../components/shared/Pagination';
import { getAllPaymentsByAdmin } from '../../_actions/payments.actions';
import PaymentTable from '../../_components/payments/payment-table';

const AdminDashboardPaymentPage = async () => {
  const result = await getAllPaymentsByAdmin();

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage all payment transactions.</p>
        </div>

        <PaymentTable payments={result.data.payments} />
      </div>
      <Pagination meta={result.data.meta} />
    </>
  );
};

export default AdminDashboardPaymentPage;
