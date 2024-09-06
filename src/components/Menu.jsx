import React, { useState, useEffect } from "react";
import "../assets/styles/components/menu.css";
import Loader from "../components/Loader";
import { popAlert } from "../utils/alerts";
import { getMenuItemsByBranch } from "../service/menu.service";
import noImg from "../assets/images/no-img.jpg";
import { getCartItmes } from "../service/order.service";

const Menu = ({ branchId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //to get the menu items according to branch
  const fetchMenuItems = async (id) => {
    setLoading(true);
    try {
      const response = await getMenuItemsByBranch(id);
      setData(response.data);
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  //to fetch the cart items
  const fetchCartItems = async () => {
    setLoading(true);

    try {
      const response = await getCartItmes();
      setCartItems(response.data);
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems(branchId);
    fetchCartItems()
  }, [branchId]);

  return (
    <>
      {loading ? Loader(loading) : null}
      <div class="menu-cart-wrapper">
        {data.map((menu) => {
          return (
            <div
              class="menu-cart-container"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="menu-cart-image-container">
                <img
                  alt="A meal tray with sauce, boiled eggs, sliced apples, and assorted vegetables"
                  src={
                    menu.images[0]?.image_url
                      ? menu.images[0]?.image_url
                      : noImg
                  }
                />
              </div>
              <div class="menu-cart-title">{menu.name}</div>
              <div class="menu-cart-description">{menu.description}</div>
              <div class="menu-cart-price">Rs. {menu.price}</div>
              <div class="menu-cart-quantity">
                <button>-</button>
                <input type="text" value="1" />
                <button>+</button>
              </div>
              <button
                class="menu-cart-add-to-basket"
                disabled={!menu.is_available}
              >
                <span>
                  {!menu.is_available ? "Out of Stock" : "Add to Cart"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
