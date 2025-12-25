import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { updateUser } from "../../../api/Auth/UpdateProfile";
function ProfileSettings() {
  const { loginState, loginDispatch } = useAuth();
  const user = loginState.user;
  const [formData, setFormData] = useState({
    username: user.username ?? "",
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email ?? "",
    bio: user.bio ?? "",
    instagram: user.instagram ?? "",
    linkedin: user.linkedin ?? "",
    profile_picture:
      user.profile_picture ?? "https://placehold.co/200x200?text=Profile+Image",
  });
  function handleChange(e) {
    const { name, type, files, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await updateUser(formData);
      loginDispatch({
        type: "LOGIN-SUCCESS",
        payload: user,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>

      {/* -------- PROFILE IMAGE -------- */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Profile Picture
        </label>

        {/* Preview */}
        <div className="flex items-center space-x-4">
          <img
            src={
              formData.profile_picture instanceof File
                ? URL.createObjectURL(formData.profile_picture)
                : formData.profile_picture ||
                  "https://placehold.co/200x200?text=Profile"
            }
            alt="Profile preview"
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* File input */}
          <input
            type="file"
            accept="image/*"
            name="profile_picture"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({ ...prev, profile_picture: file }));
              }
            }}
            className="text-sm text-gray-600"
          />
        </div>
      </div>

      {/* -------- BASIC DETAILS -------- */}
      <Section title="Account Details">
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="firstName"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <InputField
          label="lastName"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <TextAreaField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell the world about yourself..."
        />
      </Section>

      {/* -------- SOCIAL LINKS -------- */}
      <Section title="Social Profiles">
        <InputField
          label="Instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
        />

        <InputField
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </Section>

      {/* -------- ACTION BUTTON -------- */}
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
}

export default ProfileSettings;

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function InputField({ label, name, value, onChange, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}

export { Section, InputField, TextAreaField };
