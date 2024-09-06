import { getApI } from "../utils/axios";

//to get all the availble tables in the branch
export const getTables = async (branchId) => {
  try {
    const response = await getApI().get(
      `api/reservation/get/table_list/${branchId}/`
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

//to make a table reservation
export const resarveTable = async (data) => {
  try {
    const response = await getApI().post(
      "api/reservation/create/reservation/",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      return { success: false, errors: error.response };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};
