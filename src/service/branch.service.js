import { getApI } from "../utils/axios";

// to get all availabel branches
export const getAllBranches = async () => {
  try {
    const response = await getApI().get("api/branches/get_branches/");
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

//to get the branch details by branch
export const getBranchDetails = async (branchId) => {
  try {
    const response = await getApI().get(
      `api/branches/get_branches/${branchId}/`
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
