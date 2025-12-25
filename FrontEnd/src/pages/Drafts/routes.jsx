import { Route } from "react-router-dom";
import DraftPage from "./Draft";
import ProtectedRoute from "../../components/ProtectedRoute";
const DraftRoutes = (
  <Route
    path="drafts"
    element={
      <ProtectedRoute>
        <DraftPage />
      </ProtectedRoute>
    }
  />
);
export default DraftRoutes;
