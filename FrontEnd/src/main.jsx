import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DriverRoutes from "./Driver";
import { AuthProvider } from "./context/authContext";
import "./style.css";
import Layout from "./components/layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <DriverRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
