import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { loginUser } from "../../api/Auth/login";

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

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-4" onSubmit={HandleSubmit}>
          <div>
            <label className="text-gray-700 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              value={loginState.Username}
              onChange={usernameChange}
              className="mt-1 w-full p-3 rounded-lg border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={loginState.Password}
              onChange={passwordChange}
              className="mt-1 w-full p-3 rounded-lg border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
