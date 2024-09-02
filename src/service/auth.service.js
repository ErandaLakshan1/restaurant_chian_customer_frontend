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
