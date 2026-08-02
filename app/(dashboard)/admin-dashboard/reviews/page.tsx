import { Boxes } from 'lucide-react';
import Pagination from '../../../../components/shared/Pagination';
import { getAllReviews } from '../../_actions/reviews.actions';
import { ReviewTable } from '../../_components/reviews/review-table';

const AdminReviewsPage = async () => {
  const result = await getAllReviews();

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border bg-card p-6">
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p className="text-muted-foreground">View all reviews submitted by customers.</p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border px-5 py-3">
            <Boxes className="h-6 w-6 text-primary" />

            <div>
              <p className="text-xs text-muted-foreground">Total Reviews</p>

              <p className="text-2xl font-bold">{result.meta.total}</p>
            </div>
          </div>
        </div>

        <ReviewTable reviews={result.data} />
      </div>

      <Pagination meta={result.meta} />
    </>
  );
};

export default AdminReviewsPage;
