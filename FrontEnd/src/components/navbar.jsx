import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-sky-500">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 text-white text-sm">
        <Link to="/dashboard" className="hover:text-slate-900 transition">
          Home
        </Link>
        <Link to="/blogs" className="hover:text-slate-900 transition">
          Blogs
        </Link>
        <Link to="/categories" className="hover:text-slate-900 transition">
          Categories
        </Link>
        <Link to="/blog/create" className="hover:text-slate-900 transition">
          Post
        </Link>
        <Link to="/drafts" className="hover:text-slate-900 transition">
          Drafts
        </Link>
        <Link to="/profile" className="hover:text-slate-900 transition">
          Profile
        </Link>
      </div>
    </nav>
  );
}
