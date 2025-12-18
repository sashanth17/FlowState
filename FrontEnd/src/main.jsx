import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DriverRoutes from "./Driver";
import { AuthProvider } from "./context/authContext";
import "./style.css";
import { CategoryProvider } from "./context/CategoryContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <DriverRoutes />
        </BrowserRouter>
      </CategoryProvider>
    </AuthProvider>
  </StrictMode>
);
