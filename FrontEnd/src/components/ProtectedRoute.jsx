import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginState } = useAuth();
  return loginState.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
