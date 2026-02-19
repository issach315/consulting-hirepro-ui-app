import { Navigate } from "react-router-dom";
import { useAuth } from "@/context";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Expired session check
  if (user.expiryTime && user.expiryTime < Date.now()) {
    return <Navigate to="/auth" replace />;
  }

  // Role-based protection (optional)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
