import React, { useReducer } from "react";
import BlogReducer, { initialState } from "../../reducers/BlogReducer";
import { PostBlog, UpdatBlog, deleteBlogAPI } from "../../api/blogPost";
import { useCategory } from "../../context/CategoryContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

const CreateBlog = ({ mode = "CREATE" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginState } = useAuth();
  // If editing, use the passed blog data; otherwise, use initialState
  const initialBlog = location.state?.blog || initialState;
  const isAuthor =
    loginState.user && initialBlog.Author === loginState.user.username;
  const [form, dispatch] = useReducer(BlogReducer, initialBlog);

  const publishBlog = async () => {
    try {
      const formData = new FormData();

      // 1. Determine the correct Category ID to send
      // If we are in Edit mode, form.Category might be the string name,
      // but form.CategoryID will be the actual ID.
      const actualCategoryID = form.CategoryID || form.Category;

      Object.entries(form).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        // Skip read-only fields that Django doesn't need to process
        const readOnlyFields = [
          "Slug",
          "Author",
          "PublishedDate",
          "UpdatedAt",
          "CategoryID",
        ];
        if (readOnlyFields.includes(key)) return;

        // Handle the Category specifically
        if (key === "Category") {
          formData.append("Category", actualCategoryID);
        }
        // Handle Image: Only send if it's a new File
        else if (key === "FeatureImage") {
          if (value instanceof File) {
            formData.append("FeatureImage", value);
          }
        }
        // Handle Boolean
        else if (key === "IsDraft") {
          formData.append("IsDraft", value ? "true" : "false");
        }
        // Everything else
        else {
          formData.append(key, value);
        }
      });

      if (mode === "CREATE") {
        const data = await PostBlog(formData);
        console.log(data);
        navigate(`/blogs/${data && data.id}`);
        toast.success("Published!");
      } else {
        await UpdatBlog(form.id, formData);
        toast.success("Updated!");
        navigate(`/blogs/${form.id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed.");
    }
  };
  //helper function
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image instanceof File) return URL.createObjectURL(image);
    return image; // It's already a full URL from the backend
  };

  //delete blog function
  const deleteBlog = async () => {
    let permission = prompt(
      `if you want to delete the blog type ${loginState.user.username}`
    );
    if (permission === loginState.user.username) {
      try {
        await deleteBlogAPI(initialBlog.id); // Wait for the server!
        toast.success("Your blog has been deleted successfully.");
        navigate("/blogs");
      } catch (err) {
        toast.error("Failed to delete the blog. Please try again.");
      }
    }
  };
  const resetForm = () => dispatch({ type: "RESET" });
  const { categories } = useCategory();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          {mode === "CREATE" ? "Create New Blog" : "Edit Blog"}
        </h1>
        <p className="text-gray-500 mt-1">
          {mode === "CREATE"
            ? "Write and publish a new blog post"
            : "Update your blog details"}
        </p>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Blog Title
        </label>
        <input
          type="text"
          value={form.Title || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "Title",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.Category || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "Category",
                value: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value={initialBlog.CategoryID || ""}>
              {initialBlog.Category || "Select your category"}
            </option>
            {categories?.map(
              (element) =>
                element.id != initialBlog.CategoryID && (
                  <option key={element.id} value={element.id}>
                    {element.CategoryName}
                  </option>
                )
            )}
          </select>
        </div>

        {/* Feature Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feature Image
          </label>
          <div className="flex flex-col items-center gap-2">
            {form.FeatureImage && (
              <div className="w-full h-32 overflow-hidden rounded-lg border border-gray-300">
                <img src={getImageUrl(form.FeatureImage)} alt="Preview" />
              </div>
            )}

            <label
              htmlFor="feature-image"
              className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-50"
            >
              <span className="text-gray-500 text-sm">
                {form.FeatureImage instanceof File
                  ? form.FeatureImage.name
                  : "Change Image"}
              </span>
              <input
                id="feature-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  dispatch({ type: "SET_IMAGE", file: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          rows={10}
          value={form.Content || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "Content",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Draft Checkbox */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.IsDraft || false}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "IsDraft",
              value: e.target.checked,
            })
          }
          className="h-4 w-4 text-blue-600"
        />
        <label className="text-sm text-gray-700">Save as draft</label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        {mode !== "CREATE" && isAuthor && (
          <button
            type="button"
            onClick={deleteBlog}
            className="px-6 py-2 border rounded-lg hover:bg-red-300"
          >
            Delete Blog
          </button>
        )}
        <button
          type="button"
          onClick={publishBlog}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {mode === "CREATE" ? "Publish Blog" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
