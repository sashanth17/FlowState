import { Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../../components/ProtectedRoute";
const ProfileRoutes = (
  <Route
    path="Profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />
);
export default ProfileRoutes;
