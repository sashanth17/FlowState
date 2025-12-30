import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { loginUser } from "../../api/Auth/login";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login() {
  const { loginState, loginDispatch } = useAuth();
  const navigate = useNavigate();

  const usernameChange = (e) => {
    loginDispatch({
      type: "USERNAME-CHANGE",
      payload: e.target.value,
    });
  };

  const passwordChange = (e) => {
    loginDispatch({
      type: "PASSWORD-CHANGE",
      payload: e.target.value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(loginState.Username, loginState.Password);

      // backend cookie is now set
      loginDispatch({
        type: "LOGIN-SUCCESS",
        payload: { username: loginState.Username },
      });
      toast.success(`welcome back ${loginState.Username}`);
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };
  const isLoading = loginState.loading;
  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Brand Logo */}
      <Link
        to="/"
        className="flex items-center mb-10 text-3xl font-bold tracking-tighter text-gray-900"
      >
        <span className="bg-sky-600 text-white px-2 py-1 rounded mr-1">
          Flow
        </span>
        <span>State</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 md:p-10 space-y-6">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">Enter your credentials</p>
          </header>

          <form className="space-y-6" onSubmit={HandleSubmit}>
            {/* Username Field */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                Username*
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={loginState.Username}
                onChange={usernameChange}
                required
                placeholder="username"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none transition-all focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                Password*
              </label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={loginState.Password}
                onChange={passwordChange}
                required
                placeholder="••••••••"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none transition-all focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm cursor-pointer select-none">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-sky-600"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-sky-700 hover:underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={HandleSubmit}
              className="w-full text-white bg-sky-600 hover:bg-sky-700 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all active:scale-[0.99]"
            >
              Login
            </button>

            <p className="text-sm font-medium text-gray-600 text-center">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-sky-700 hover:underline underline-offset-4 font-semibold"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer Fix */}
      <footer className="mt-8 text-gray-500 text-xs tracking-widest uppercase">
        © 2025 FlowState Protocol
      </footer>
    </section>
  );
}
