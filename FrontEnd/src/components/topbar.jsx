import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../api/Auth/logout";
import PhotoCard from "./PhotCard";
export default function Topbar() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const { loginState, loginDispatch } = useAuth();
  const Logout = async () => {
    logoutUser();
    loginDispatch({ type: "LOGOUT" });
    goToLogin();
  };
  return (
    <header className=" bg-sky-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1
          className="text-xl font-semibold text-gray-800"
          onClick={() => {
            navigate("/");
          }}
        >
          MyBlog
        </h1>
        {loginState.isLoggedIn ? (
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            onClick={Logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            onClick={goToLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
