import { createContext, useContext, useReducer } from "react";
import LoginReducer from "../reducers/LoginReducer";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(LoginReducer, {
    Username: "",
    Password: "",
    isLoggedIn: false,
  });
  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};
export { useAuth, AuthProvider };
