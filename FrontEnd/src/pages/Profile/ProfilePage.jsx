import { useState } from "react";
import { useAuth } from "../../context/authContext";

// =====================Tabs===============
import ProfileOverview from "./Tabs/overviewTab";
import ProfileFriends from "./Tabs/FriendsTab";
import ProfileSettings from "./Tabs/SettingsTab";
import ProfileBlogs from "./Tabs/BlogsTab";
// =====================Tabs===============

export default function ProfilePage() {
  const { loginState } = useAuth();
  const user = loginState.user;

  const [activeTab, setActiveTab] = useState("overview");

  const profileImage =
    (user && user.profile_picture) || "https://i.pravatar.cc/150?img=12"; // 🔹 placeholder until update enabled

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-100">
      <div className="max-w-5xl mx-auto space-y-6">
        <ProfileHeader user={user} profileImage={profileImage} />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "overview" && <ProfileOverview user={user} />}
          {activeTab === "blogs" && <ProfileBlogs />}
          {activeTab === "friends" && <ProfileFriends />}
          {activeTab === "about" && <ProfileSettings user={user} />}
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   HEADER & INFO
   =================================================== */

function ProfileHeader({ user, profileImage }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="relative px-6 pb-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white absolute -top-16 left-6 object-cover"
        />

        <div className="pt-20 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.username}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <p className="mt-3 text-gray-600 max-w-xl">
              {user.bio || "No bio added yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================================================
   TABS
   =================================================== */

function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "blogs", label: "Blogs" },
    { id: "friends", label: "Friends" },
    { id: "about", label: "settings" },
  ];

  return (
    <div className="flex gap-2 border-b bg-white rounded-xl shadow-sm px-4 py-3">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${
              activeTab === t.id
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
