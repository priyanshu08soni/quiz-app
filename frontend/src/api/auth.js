import { API_PATHS } from "../utils";

// 🔹 Login API
export const loginUser = async (loginInfo) => {
  try {
    const response = await fetch(API_PATHS.AUTH.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });

    const result = await response.json();
    return { response, result };
  } catch (error) {
    throw new Error("Network error while logging in");
  }
};

// 🔹 Signup API
export const signupUser = async (signupInfo) => {
  try {
    const response = await fetch(API_PATHS.AUTH.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupInfo),
    });

    const result = await response.json();
    return { response, result };
  } catch (error) {
    throw new Error("Network error while signing up");
  }
};
