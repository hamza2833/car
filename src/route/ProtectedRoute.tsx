import { Navigate, Outlet } from "react-router-dom";
import { getUserFromTokenV2 } from "../utils/User";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Optional: Define roles allowed to access this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const user = getUserFromTokenV2();

  // If user is not authenticated, redirect to Sign In
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If roles are defined and the user does not have the required role, redirect to Landing
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;