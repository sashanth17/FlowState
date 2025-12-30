import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../api/Auth/logout";
import PhotoCard from "./PhotCard";
export default function Topbar() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const { loginState, loginDispatch } = useAuth();
  const Logout = async () => {
    await logoutUser();
    loginDispatch({ type: "LOGOUT" });
    goToLogin();
  };
  return (
    <header className="bg-white border-b border-sky-500">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1
          className="text-xl font-bold text-slate-800 cursor-pointer hover:text-sky-600 transition"
          onClick={() => navigate("/")}
        >
          FlowState
        </h1>

        {loginState.isLoggedIn ? (
          <button
            onClick={Logout}
            className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={goToLogin}
            className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
