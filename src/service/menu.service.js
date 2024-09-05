import { getApI } from "../utils/axios";

//to get all the menu items according to branch
export const getMenuItemsByBranch = async (branchId) => {
  try {
    const response = await getApI().get(
      `api/menu/get/menu_items_by_user/${branchId}/`
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
