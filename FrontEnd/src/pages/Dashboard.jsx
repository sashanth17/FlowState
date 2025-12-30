import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { loginState } = useAuth();
  const username = loginState?.user?.username || "User";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* HEADER / WELCOME */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md py-10 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome back, <span className="text-blue-600">{username}</span> 👋
        </h2>
        <p className="mt-2 text-slate-500 max-w-xl mx-auto">
          Thank you for joining our platform ❤️ I'm currently building a
          personalized dashboard experience for you,i will make sure it reaches
          you soon.
        </p>
      </motion.section>

      {/* MAIN DASHBOARD CONTENT */}
      <section className="max-w-6xl mx-auto w-full px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* CARD: Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3
            className="text-xl font-semibold text-slate-800 mb-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Your Profile
          </h3>
          <p className="text-slate-500 text-sm">
            Manage your username, avatar & preferences.
          </p>
        </motion.div>

        {/* CARD: Create Post */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3
            className="text-xl font-semibold text-slate-800 mb-2 cursor-pointer"
            onClick={() => navigate("/blog/create")}
          >
            Create your first Post ✍️
          </h3>
          <p className="text-slate-500 text-sm">
            Post ideas and content to share with others.
          </p>
        </motion.div>

        {/* CARD: Activity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm border p-6"
          onClick={() => navigate("/blogs")}
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Visit Blogs 📊
          </h3>
          <p className="text-slate-500 text-sm">
            explore the post which are posted by the users of this platform
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-slate-500 py-6">
        Dashboard v0.1 — More features coming soon 🚀
      </footer>
    </div>
  );
};

export default Dashboard;
