/* ===================================================
   REUSABLE UI
   =================================================== */

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium">{value || "-"}</span>
    </div>
  );
}

function SocialItem({ name, link }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-100">
      <span className="text-gray-700 text-sm">{name}</span>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          Visit
        </a>
      ) : (
        <span className="text-gray-400 text-sm">Not added</span>
      )}
    </div>
  );
}

function Placeholder({ title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center py-14">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}

export { DetailRow, SocialItem, Placeholder };
