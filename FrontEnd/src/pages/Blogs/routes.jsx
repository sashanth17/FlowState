import { Route } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import ProtectedRoute from "../../components/ProtectedRoute";
const BlogRoutes = (
  <Route
    path="/blog/create"
    element={
      <ProtectedRoute>
        <CreateBlog />
      </ProtectedRoute>
    }
  ></Route>
);
export default BlogRoutes;
