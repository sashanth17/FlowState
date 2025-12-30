import { useNavigate } from "react-router-dom";
import { getUsersList } from "./api/Auth/getUser";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// MUI
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Mail, Users, Heart, Zap, Edit3 } from "lucide-react"; // Recommended: lucide-react for icons

const Landing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getUsersList(currentPage);
        setUsers(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log("Error loading users:", error);
      }
    };
    getUsers();
  }, [currentPage]);

  const handlePageChange = (_event, value) => {
    if (value !== currentPage) setCurrentPage(value);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-blue-100">
      {/* 🟢 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* Icon with Sky Background */}
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center transition-transform hover:scale-105">
              <Edit3 className="text-white w-5 h-5" />
            </div>

            {/* Brand Text */}
            <span className="bg-sky-600 text-white px-2 py-1 rounded font-semibold">
              Flow
            </span>
            <span className="text-gray-900 font-bold">State</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 🔵 HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full"
          >
            🚀 Join 1,000+ creators today
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-blue-600 bg-clip-text text-transparent"
          >
            Write. Connect. <br />
            Grow your Mind.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            blogging platform for students and developers. Share your journey,
            learn from others, and build your digital presence.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
          >
            Start your journey — It's free
          </motion.button>
        </div>
      </section>

      {/* 🟡 FEATURES BENTO GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Coming Very Soon
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="text-blue-500" />}
            title="Social Connections"
            desc="Add friends and follow your favorite creators to never miss a post."
          />
          <FeatureCard
            icon={<Heart className="text-pink-500" />}
            title="Engage & Interact"
            desc="Real-time likes and comments to foster deep discussions on every topic."
          />
          <FeatureCard
            icon={<Zap className="text-amber-500" />}
            title="Co-Authoring"
            desc="Two heads are better than one. Collaborate on posts with your peers."
          />
        </div>
      </section>

      {/* 🔴 COMMUNITY SECTION */}
      <section className="bg-white border-y border-gray-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">
                Meet our early supporters ❤️
              </h2>
              <p className="text-gray-500">
                The pioneers who are shaping the future of MyPlatform. Join the
                wall of fame.
              </p>
            </div>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Stack>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users &&
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={
                        user.profile_picture ??
                        `https://ui-avatars.com/api/?name=${user.username}&background=random`
                      }
                      sx={{
                        width: 56,
                        height: 56,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    />
                    <div>
                      <h3 className="font-bold group-hover:text-blue-600 transition">
                        {user.username}
                      </h3>
                      <p className="text-xs font-medium text-blue-500 uppercase tracking-wider">
                        Member
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed italic">
                    "
                    {user.bio ??
                      "Building the future of content, one post at a time. 🚀"}
                    "
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 🟣 ABOUT & FEEDBACK */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
          <h2 className="text-3xl font-bold mb-6">A message from Sashanth</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            "I built this platform to give creators a clean, distraction-free
            space to share ideas. I'm constantly building and would love your
            feedback on how to make this better."
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sashan1707@gmail.com&su=Feedback%20for%20your%20platform&body=Hey%20Sashanth%2C%0A%0AI%20have%20an%20idea%20I%20would%20like%20to%20share%20regarding%20your%20platform.%0A%0AHere%20it%20is%3A%0A-%20"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={18} /> Share your Ideas
          </a>
        </div>
      </section>

      {/* ⚪ FOOTER */}
      <footer className="border-t border-gray-100 py-12 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} MyPlatform. All rights reserved.</p>
        <p className="mt-2 text-gray-300 italic">
          Built with passion by Sashanth
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
