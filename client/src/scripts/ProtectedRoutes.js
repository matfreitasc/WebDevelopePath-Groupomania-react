import { Navigate, Outlet, useLocation } from 'react-router';

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

function ProtectedRoutes() {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace state={{ from: location }} />
  );
}

export default ProtectedRoutes;
