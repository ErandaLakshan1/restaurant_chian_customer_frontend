import { getApI } from "../utils/axios";

//  for register user
export const registerUser = async (data) => {
  try {
    const response = await getApI().post(
      "api/users/create/register_user/",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errors: error.response.data };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};

//for user login
export const loginUser = async (data) => {
  try {
    const response = await getApI().post("api/users/token/", data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error);
      return { success: false, errors: error.response.data };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};

//for get user profile
export const getUserProfile = async () => {
  try {
    const response = await getApI().get("api/users/get/user_account/");
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errors: error.response.data };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};

//for delete user account
export const deleteUserAccount = async () => {
  try {
    const response = await getApI().delete("api/users/delete/user_account/");
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errors: error.response.data };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};
