export default function Footer() {
  return (
    <footer className="bg-sky-50 border-t border-sky-500">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-700 text-sm">
        © {new Date().getFullYear()} FlowState — All Rights Reserved.
      </div>
    </footer>
  );
}
