import Topbar from "./topbar";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">{children}</main>

      <Footer />
    </div>
  );
}
