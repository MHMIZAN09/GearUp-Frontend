import { CreditCard } from 'lucide-react';
import Pagination from '../../../../components/shared/Pagination';
import { getAllPaymentsByAdmin } from '../../_actions/payments.actions';
import PaymentTable from '../../_components/payments/payment-table';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';

const AdminDashboardPaymentPage = async () => {
  const result = await getAllPaymentsByAdmin();

  return (
    <>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Financial operations"
          title="Payments"
          description="Review payment transactions, monitor statuses, and keep every rental payment traceable."
          icon={CreditCard}
          metric={{ label: 'Transactions', value: result.data.meta.total }}
        />

        <PaymentTable payments={result.data.payments} />
      </div>
      <Pagination meta={result.data.meta} />
    </>
  );
};

export default AdminDashboardPaymentPage;
