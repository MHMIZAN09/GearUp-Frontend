import { getProviderRentals } from '../../_actions/rental.actions';

const ProviderRentalsPage = async () => {
  const result = await getProviderRentals();
  console.log('result', result);
  return <div>ProviderRentalsPage</div>;
};

export default ProviderRentalsPage;
