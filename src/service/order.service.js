import { getApI } from "../utils/axios";

// create cart
export const createCart = async (data) => {
  try {
    const response = await getApI().post("api/orders/create/cart/", data);
    console.log(response);
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

// to update the item in cart(quntity)
export const updateCart = async (itemId, data) => {
  try {
    const response = await getApI().patch(
      `api/orders/update/cart/${itemId}/`,
      data
    );
    console.log(response);
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

// to remove item in the cart
export const removeItems = async (itemId) => {
  try {
    const response = await getApI().delete(
      `api/orders/delete/cart_item/${itemId}/`
    );
    console.log(response);
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

// to delete the cart
export const deleteCart = async () => {
  try {
    const response = await getApI().delete("api/orders/delete/cart/");
    console.log(response);
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

// to get teh cart items
export const getCartItmes = async () => {
  try {
    const response = await getApI().get("api/orders/get/cart/");
    console.log(response);
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

// to place the order
export const placeOrder = async (data) => {
  try {
    const response = await getApI().post("api/orders/create/order/", data);
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
