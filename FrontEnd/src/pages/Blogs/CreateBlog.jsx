import React, { useReducer } from "react";
import BlogReducer, { initialState } from "../../reducers/BlogReducer";
import { PostBlog } from "../../api/blogPost";
import { useCategory } from "../../context/CategoryContext";

const CreateBlog = () => {
  const [form, dispatch] = useReducer(BlogReducer, initialState);
  const publishBlog = async () => {
    console.log(form);
    const response = await PostBlog(form);
  };

  const resetForm = () => {
    dispatch({ type: "RESET" });
  };

  //getting category from context
  const { categories } = useCategory();

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Create New Blog
        </h1>
        <p className="text-gray-500 mt-1">Write and publish a new blog post</p>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Blog Title
        </label>
        <input
          type="text"
          value={form.Title}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "Title",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>

      {/* Category & Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.Category}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "Category",
                value: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            {categories &&
              categories.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.CategoryName}
                </option>
              ))}
          </select>
        </div>

        {/* Feature Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Feature Image
          </label>
          <label
            htmlFor="feature-image"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
          >
            <span className="text-gray-500 text-sm">
              {form.FeatureImage
                ? form.FeatureImage.name
                : "Click to upload image"}
            </span>
            <input
              id="feature-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                dispatch({
                  type: "SET_IMAGE",
                  file: e.target.files[0],
                })
              }
            />
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          rows={10}
          value={form.Content}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "Content",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      {/* Draft */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.IsDraft}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "IsDraft",
              value: e.target.checked,
            })
          }
        />
        <label className="text-sm text-gray-700">Save as draft</label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border rounded-lg"
          onClick={resetForm}
        >
          Reset
        </button>
        <button className="px-6 py-2 border rounded-lg">Cancel</button>
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          onClick={publishBlog}
        >
          Publish Blog
        </button>
      </div>
    </>
  );
};

export default CreateBlog;
