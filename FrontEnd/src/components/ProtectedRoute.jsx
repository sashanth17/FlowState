import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginState } = useAuth();

  console.log("ProtectedRoute auth:", loginState);

  if (loginState.loading) return null; // or spinner

  return loginState.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
