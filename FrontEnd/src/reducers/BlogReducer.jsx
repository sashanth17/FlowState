const initialState = {
  Title: "",
  Content: "",
  Category: "",
  IsDraft: false,
  FeatureImage: null,
};

const BlogReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_IMAGE":
      return { ...state, FeatureImage: action.file };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export { initialState };
export default BlogReducer;
