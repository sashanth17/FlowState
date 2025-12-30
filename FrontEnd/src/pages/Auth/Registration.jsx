import React, { useState } from "react";
import { RegisterUser } from "../../api/Auth/signup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
    instagram: "",
    linkedin: "",
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await RegisterUser(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        "Signup failed: " +
          (err.response?.data?.message || "Check your details")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-4 flex flex-col items-center">
      {/* Brand Logo */}
      <Link
        to="/"
        className="flex items-center mb-8 text-3xl font-bold tracking-tighter text-gray-900"
      >
        <span className="bg-sky-600 text-white px-2 py-1 rounded mr-1">
          Flow
        </span>
        <span>State</span>
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Create new account
            </h1>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Email - Full Width */}
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none transition-all"
                  placeholder="dev@example.com"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Username*
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                  placeholder="username"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                  placeholder="••••••••"
                />
              </div>

              {/* Names */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  placeholder="Doe"
                />
              </div>

              {/* Socials */}
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  placeholder="linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  placeholder="instagram.com/..."
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Profile Picture
                </label>
                <label
                  htmlFor="profile_picture"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="text-sm text-gray-500">
                      <span className="font-bold text-gray-700">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    {formData.profile_picture && (
                      <p className="mt-2 text-xs text-green-600 font-bold uppercase tracking-wider">
                        Ready: {formData.profile_picture.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="profile_picture"
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  placeholder="I'm a computer science student interested in..."
                ></textarea>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white bg-sky-600 hover:bg-sky-700 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "active:scale-[0.99]"
              }`}
            >
              {loading ? "Initializing..." : "Create Account"}
            </button>

            <p className="text-sm font-medium text-gray-600 text-center">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-sky-700 hover:underline underline-offset-4 font-semibold"
              >
                Login instead
              </Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-xs tracking-widest uppercase">
        &copy; 2025 FlowState Protocol
      </footer>
    </section>
  );
};

export default SignUp;
