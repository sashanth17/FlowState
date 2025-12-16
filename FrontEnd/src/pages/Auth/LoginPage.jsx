import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { loginApi } from "../../api/login";

export default function Login() {
  const { loginState, loginDispatch } = useAuth();
  const navigate = useNavigate();
  const usernameChange = (u) => {
    loginDispatch({ type: "USERNAME-CHANGE", Username: u.target.value });
  };
  const passwordChange = (p) => {
    loginDispatch({ type: "PASSWORD-CHANGE", Password: p.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(loginState.Username, loginState.Password);
      loginDispatch({ type: "LOGIN-SUCCESS" });
      navigate("/dashboard");

      console.log("Login Successful:", data);
    } catch {
      alert("invalid credential");
    }
  };
  console.log(loginState);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-4">
          <div>
            <label className="text-gray-700 text-sm font-medium">
              username
            </label>
            <input
              type="username"
              placeholder={loginState.Username}
              onChange={usernameChange}
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder={loginState.Password}
              onChange={passwordChange}
              className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <button type="button" className="text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={HandleSubmit}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
