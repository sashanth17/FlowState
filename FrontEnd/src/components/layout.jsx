import { Outlet } from "react-router-dom";
import Topbar from "./topbar";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Topbar />
      <Navbar />

      <main className="flex-1 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
