import { Route } from "react-router-dom";
import Categories from "./Categories";
import Layout from "../../components/layout";
const BlogThemeRoutes = (
  <Route path="/categories" element={<Categories />}></Route>
);
export default BlogThemeRoutes;
