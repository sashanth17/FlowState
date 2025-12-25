export default function Navbar() {
  return (
    <nav className="bg-rose-400 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 text-gray-700 text-sm">
        <a href="/dashboard" className="hover:text-blue-600">
          Home
        </a>
        <a href="/blogs" className="hover:text-blue-600">
          Blogs
        </a>
        <a href="/categories" className="hover:text-blue-600">
          Categories
        </a>
        <a href="/blog/create" className="hover:text-blue-600">
          Post
        </a>
        <a href="/drafts" className="hover:text-blue-600">
          Drafts
        </a>
        <a href="/Profile" className="hover:text-blue-600 flex-row-reverse">
          Profile
        </a>
      </div>
    </nav>
  );
}
