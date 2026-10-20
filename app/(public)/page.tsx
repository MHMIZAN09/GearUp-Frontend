import BrowseCategories from '../../components/shared/BrowseCategories';
import CustomerReviews from '../../components/shared/CustomerReviews';
import FaqSection from '../../components/shared/FaqSection';
import Hero from '../../components/shared/Hero';
import HowItWorks from '../../components/shared/HowItWorks';
import ProviderCta from '../../components/shared/ProviderCta';

const HomePage = async () => {
  return (
    <div className="container mx-auto space-y-10 px-4 py-10">
      <Hero />
      <BrowseCategories />
      <ProviderCta />
      <HowItWorks />
      <CustomerReviews />
      <FaqSection />
    </div>
  );
};

export default HomePage;
