import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DriverRoutes from "./Driver";
import { AuthProvider } from "./context/authContext";
import "./style.css";
import { CategoryProvider } from "./context/CategoryContext";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <DriverRoutes />
        </BrowserRouter>
      </CategoryProvider>
    </AuthProvider>
  </StrictMode>
);
