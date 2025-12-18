const LoginReducer = (state, action) => {
  switch (action.type) {
    case "USERNAME-CHANGE":
      return {
        ...state,
        Username: action.payload,
      };

    case "PASSWORD-CHANGE":
      return {
        ...state,
        Password: action.payload,
      };

    case "AUTH-LOADING":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN-SUCCESS":
      return {
        Username: "",
        Password: "",
        isLoggedIn: true,
        user: action.payload || null,
        loading: false,
      };

    case "LOGOUT":
      return {
        Username: "",
        Password: "",
        isLoggedIn: false,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default LoginReducer;
