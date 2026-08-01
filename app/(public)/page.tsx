import { getAllReviews } from '../(dashboard)/_actions/reviews.actions';
import Hero from '../../components/shared/Hero';

const HomePage = async () => {
  return (
    <div className="container mx-auto py-10">
      <Hero />
    </div>
  );
};

export default HomePage;
