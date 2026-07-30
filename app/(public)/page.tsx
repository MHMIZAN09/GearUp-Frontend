import { getMe } from '../../service/getMe';
const HomePage = () => {
  const user = getMe();
  console.log('user:', user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomePage;
