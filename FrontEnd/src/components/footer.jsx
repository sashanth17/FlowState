export default function Footer() {
  return (
    <footer className="bg-sky-300 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} MyBlog — All Rights Reserved.
      </div>
    </footer>
  );
}
