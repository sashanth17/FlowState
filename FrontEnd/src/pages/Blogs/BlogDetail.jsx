import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchBlogDetail } from "../../api/blogs/FetchBlogDetail";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loginState } = useAuth();
  const navigate = useNavigate();
  const [allowEdit, setEdit] = useState(false);

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await fetchBlogDetail(id);

        // ✔️ correct check — compares strings properly
        const isAuthor =
          loginState.user && data.Author === loginState.user.username;

        setEdit(isAuthor);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id, loginState.user?.username]); // ✔️ added dependency so edit status stays updated

  const goToEdit = () => {
    navigate(`/blogs/${blog.id}/edit`, { state: { blog } });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Blog not found.</p>
      </main>
    );
  }

  const {
    Title,
    FeatureImage,
    Content,
    Author,
    Category,
    PublishedDate,
    UpdatedAt,
  } = blog;

  const published = PublishedDate
    ? new Date(PublishedDate).toLocaleDateString()
    : "Not Published";

  const updated =
    UpdatedAt && PublishedDate !== UpdatedAt
      ? new Date(UpdatedAt).toLocaleDateString()
      : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <article className="max-w-4xl mx-auto px-4 py-10">
        {FeatureImage && (
          <img
            src={`${FeatureImage}`}
            alt={Title}
            className="w-full h-64 object-cover rounded-xl shadow-sm mb-6"
          />
        )}

        {Category && (
          <span className="inline-block text-xs uppercase tracking-wide text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mb-2">
            {Category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {Title}
        </h1>

        {/* ✔️ edit button only if author */}
        {allowEdit && (
          <button
            onClick={goToEdit}
            className="text-sm text-blue-600 underline mb-4"
          >
            Edit Blog
          </button>
        )}

        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-8">
          {Author && (
            <span>
              By <span className="font-medium text-gray-700">{Author}</span>
            </span>
          )}
          <span>• Published: {published}</span>
          {updated && <span>• Updated: {updated}</span>}
        </div>

        <div className="prose prose-indigo max-w-none text-gray-800 whitespace-pre-line">
          {Content}
        </div>
      </article>
    </main>
  );
}

export default BlogDetailPage;
