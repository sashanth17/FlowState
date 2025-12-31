import { useCategory } from "../../context/CategoryContext";
import { useAuth } from "../../context/authContext";
import { useReducer, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload, Edit3, User } from "lucide-react";
import { CreateCategory, UpdateCategory } from "../../api/categorylist";
import toast from "react-hot-toast";
const formReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_FORM":
      return {
        ...state,
        isOpen: true,
        mode: "CREATE",
        payload: {
          id: null,
          CategoryName: "",
          CategoryDescription: "",
          CategoryImage: null,
        },
      };

    case "OPEN_EDIT":
      return {
        ...state,
        isOpen: true,
        mode: "EDIT",
        payload: {
          id: action.data.id,
          CategoryName: action.data.CategoryName,
          CategoryDescription: action.data.CategoryDescription,
          CategoryImage: action.data.CategoryImage, // existing URL
        },
      };

    case "CLOSE_FORM":
      return { ...state, isOpen: false };

    case "UPDATE_FIELD":
      return {
        ...state,
        payload: { ...state.payload, [action.field]: action.value },
      };

    default:
      return state;
  }
};

const AddEditCategoryForm = ({ state, dispatch, onSubmit }) => {
  const fileInputRef = useRef(null);
  const { CategoryName, CategoryDescription, CategoryImage } = state.payload;

  const getPreviewUrl = (image) => {
    if (!image) return null;
    if (image instanceof File) return URL.createObjectURL(image);
    return image;
  };

  if (!state.isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
        >
          <div className="px-10 pt-10 pb-4 flex justify-between items-center">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {state.mode === "CREATE" ? "New Category" : "Update Category"}
            </h3>
            <button
              onClick={() => dispatch({ type: "CLOSE_FORM" })}
              className="p-2 hover:bg-slate-100 rounded-full transition"
            >
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(state.payload, state.mode);
            }}
            className="p-10 pt-2 flex flex-col gap-6"
          >
            {/* IMAGE */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Cover Image
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] h-44 flex flex-col items-center justify-center transition-all overflow-hidden
                  ${
                    CategoryImage
                      ? "border-blue-200 bg-blue-50/30"
                      : "border-slate-200 hover:border-blue-400 bg-slate-50"
                  }`}
              >
                {CategoryImage ? (
                  <img
                    src={getPreviewUrl(CategoryImage)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-600">
                      Upload Image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "CategoryImage",
                      value: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Category Name"
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-100 outline-none font-medium"
                value={CategoryName}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "CategoryName",
                    value: e.target.value,
                  })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Description
              </label>
              <textarea
                placeholder="Description..."
                rows="3"
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-100 outline-none font-medium resize-none"
                value={CategoryDescription}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "CategoryDescription",
                    value: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-2xl py-4 font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              {state.mode === "CREATE" ? "Create Category" : "Save Changes"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Categories = () => {
  const { categories, refetchCategories } = useCategory();
  const { loginState } = useAuth();
  const [formState, dispatch] = useReducer(formReducer, {
    isOpen: false,
    mode: "CREATE",
    payload: {},
  });

  const handleFormSubmit = async (payload, mode) => {
    const categoryId = payload.id; // <-- get id first
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "CategoryImage" && !(value instanceof File)) return;
      formData.append(key, value);
    });

    try {
      if (mode === "CREATE") {
        toast.loading("please wait the category is being created");
        await CreateCategory(formData);
        toast.success("Category created 🎉");
      } else {
        toast.loading("please wait the category is updating");
        await UpdateCategory(formData, categoryId); // <-- correctly send id
        toast.success("Category updated ✨");
      }
      dispatch({ type: "CLOSE_FORM" });
      await refetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-grey-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              Explore
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Browse by category
            </p>
          </div>

          <button
            onClick={() => dispatch({ type: "OPEN_FORM" })}
            className="bg-slate-900 text-white rounded-2xl px-8 py-4 font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={20} /> Add New
          </button>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => {
            const isOwner =
              loginState.user && cat.Author === loginState.user.username;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={
                      cat.CategoryImage || "https://via.placeholder.com/400x300"
                    }
                    alt={cat.CategoryName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {isOwner && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: "OPEN_EDIT", data: cat });
                      }}
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur shadow-lg rounded-2xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {cat.CategoryName}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
                    {cat.CategoryDescription ||
                      "Discover amazing content in this section."}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AddEditCategoryForm
        state={formState}
        dispatch={dispatch}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
};

export default Categories;
