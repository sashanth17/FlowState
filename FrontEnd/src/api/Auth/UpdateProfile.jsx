import api from "../axios";

export const updateUser = async (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (key === "profile_picture" && value instanceof File) {
      formData.append(key, value);
    } else if (key !== "profile_picture") {
      formData.append(key, value);
    }
  });
  try {
    const response = await api.patch("user/updateUser", formData);
    return response.data;
  } catch (err) {
    console.error("post failed", err);
  }
};
