import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Landing from "./LandingPage";

import Login from "./pages/Auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import BlogDashboard from "./pages/Blogs/BlogListing";

import BlogRoutes from "./pages/Blogs/routes";
import BlogThemeRoutes from "./pages/BlogThemes/routes";
import DraftRoutes from "./pages/Drafts/routes";
import ProfileRoutes from "./pages/Profile/routes";

import { useAuth } from "./context/authContext";

const DriverRoutes = () => {
  const { loginState } = useAuth();
  return (
    <Routes>
      {/* Pages WITHOUT layout */}
      <Route index element={<Landing />} />
      <Route
        path="login"
        element={
          loginState.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      {/* Pages WITH layout */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs" element={<BlogDashboard />} />
        {BlogRoutes}
        {BlogThemeRoutes}
        {DraftRoutes}
        {ProfileRoutes}
      </Route>
    </Routes>
  );
};

export default DriverRoutes;
