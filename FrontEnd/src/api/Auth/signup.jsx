import api from "../axios";

export const RegisterUser = async (SignupForm) => {
  // 1. Prepare the data
  const data = new FormData();
  Object.entries(SignupForm).forEach(([key, value]) => {
    // Only append if value is not null or undefined
    if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });

  try {
    // 2. Make the call and store in a variable scoped to this block
    const response = await api.post("user/Register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 3. Return the response back to the component
    return response;
  } catch (err) {
    // 4. Log the error for debugging
    console.error("API Register Error:", err.response?.data || err.message);

    // 5. IMPORTANT: Re-throw the error so the component's
    // catch block can show an alert to the user
    throw err;
  }
};
