import { createContext, useContext, useEffect, useReducer } from "react";
import LoginReducer from "../reducers/LoginReducer";
import { getUser } from "../api/Auth/getUser";

const AuthContext = createContext();

const initialState = {
  Username: "",
  Password: "",
  isLoggedIn: false,
  user: {
    id: null,
    username: null,
    email: null,
    bio: null,
    instagram: null,
    linkedin: null,
    profile_picture: null,
  },
  loading: true,
};

const AuthProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(LoginReducer, initialState);

  // 🔐 CHECK AUTH ONLY ON FIRST LOAD
  useEffect(() => {
    const checkAuth = async () => {
      loginDispatch({ type: "AUTH-LOADING" });

      try {
        const user = await getUser(); // backend validates cookie
        user &&
          loginDispatch({
            type: "LOGIN-SUCCESS",
            payload: user,
          });
      } catch {
        loginDispatch({ type: "LOGOUT" });
      }
    };

    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
