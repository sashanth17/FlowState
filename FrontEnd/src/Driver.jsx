import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/LoginPage";
import Landing from "./LandingPage";
import BlogDashboard from "./pages/Blogs/BlogDashboard";
import Layout from "./components/layout";
const DriverRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <BlogDashboard />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default DriverRoutes;
