export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r p-5 space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Categories</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="hover:text-blue-600 cursor-pointer">Tech</li>
          <li className="hover:text-blue-600 cursor-pointer">Lifestyle</li>
          <li className="hover:text-blue-600 cursor-pointer">Travel</li>
          <li className="hover:text-blue-600 cursor-pointer">Education</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Posts
        </h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="hover:text-blue-600 cursor-pointer">
            How to learn React
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            2025 Tech Trends
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            Why Tailwind CSS?
          </li>
        </ul>
      </section>
    </aside>
  );
}
