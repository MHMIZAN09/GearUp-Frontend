import { MessageSquareQuote } from 'lucide-react';

import Pagination from '../../../../components/shared/Pagination';
import { getAllReviews } from '../../_actions/reviews.actions';
import { ReviewTable } from '../../_components/reviews/review-table';
import { AdminPageHeader } from '../../_components/admin/admin-page-header';

const AdminReviewsPage = async () => {
  const result = await getAllReviews();

  console.log('Reviews API result:', result);

  // Supports both direct and nested response structures.
  const response = result?.data?.meta
    ? result.data
    : result;

  const reviews = Array.isArray(response?.data)
    ? response.data
    : [];

  const meta = response?.meta;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Customer voice"
        title="Reviews"
        description="Monitor customer feedback, understand rental experiences, and keep marketplace quality visible."
        icon={MessageSquareQuote}
        metric={{
          label: 'Customer reviews',
          value: meta?.total ?? reviews.length,
        }}
      />

      <ReviewTable reviews={reviews} />

      {meta && <Pagination meta={meta} />}
    </div>
  );
};

export default AdminReviewsPage;