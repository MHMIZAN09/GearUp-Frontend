import { getAdminAnalytics } from '../../_actions/analytics.actions';

const AnalyticsPages = async () => {
  const result = await getAdminAnalytics();
  console.log('analytics result', result);
  return <div>analytics</div>;
};

export default AnalyticsPages;
