const LoginReducer = (state, action) => {
  switch (action.type) {
    case "USERNAME-CHANGE":
      return { ...state, Username: action.Username };

    case "PASSWORD-CHANGE":
      return { ...state, Password: action.Password };

    case "LOGIN-SUCCESS":
      return { ...state, isLoggedIn: true };

    case "LOGOUT":
      alert("you have been logged out");
      return { ...state, token: "", isLoggedIn: false };
    default:
      return state;
  }
};

export default LoginReducer;
