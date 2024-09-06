import React, { useState, useEffect } from "react";
import "../assets/styles/components/menu.css";
import Loader from "../components/Loader";
import { popAlert } from "../utils/alerts";
import { getMenuItemsByBranch } from "../service/menu.service";
import noImg from "../assets/images/no-img.jpg";
import { getCartItmes, createCart, updateCart } from "../service/order.service";

const Menu = ({ branchId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [menuToCartIdMap, setMenuToCartIdMap] = useState({});

  // fetch menu items
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

  // fetch cart items
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await getCartItmes();
      if (response && response.data) {
        const items = Array.isArray(response.data.items)
          ? response.data.items
          : [];
        setCartItems(items);

        const map = items.reduce((acc, item) => {
          acc[item.menu_item.id] = item.id;
          return acc;
        }, {});
        setMenuToCartIdMap(map);
      } else {
        setCartItems([]);
        setMenuToCartIdMap({});
      }
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

  // add items to cart
  const handleAddToCart = async (menuItemId, quantity) => {
    const data = {
      branch: branchId,
      items: [
        {
          menu_item: menuItemId,
          quantity: quantity,
        },
      ],
    };

    try {
      const result = await createCart(data);
      if (result.success) {
        popAlert("Success", "Item added to cart!", "success");
        fetchCartItems();
      } else {
        popAlert(
          "Error",
          result.errors.general || "Failed to add item to cart.",
          "error"
        );
      }
    } catch (error) {
      popAlert(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  // update cart item quantity
  const handleUpdateQuantity = async (menuItemId, newQuantity) => {
    const cartItemId = menuToCartIdMap[menuItemId];
    if (!cartItemId) {
      console.error("Cart item ID not found for menu item:", menuItemId);
      return;
    }

    console.log(
      "Updating cart item:",
      cartItemId,
      "with new quantity:",
      newQuantity
    ); // Debug log
    try {
      const data = { quantity: newQuantity };
      const result = await updateCart(cartItemId, data);
      if (result.success) {
        fetchCartItems(); 
        popAlert("Success", "Cart updated successfully!", "success");
      } else {
        popAlert(
          "Error",
          result.errors.general || "Failed to update cart.",
          "error"
        );
      }
    } catch (error) {
      popAlert(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchMenuItems(branchId);
    fetchCartItems();
  }, [branchId]);

  const getCartItemQuantity = (menuItemId) => {
    const cartItem = cartItems.find((item) => item.menu_item.id === menuItemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="menu-cart-wrapper">
        {data.map((menu) => {
          const quantity = getCartItemQuantity(menu.id);
          const isInCart = quantity > 0;

          return (
            <div
              className="menu-cart-container"
              key={menu.id}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="menu-cart-image-container">
                <img alt={menu.name} src={menu.images[0]?.image_url || noImg} />
              </div>
              <div className="menu-cart-title">{menu.name}</div>
              <div className="menu-cart-description">{menu.description}</div>
              <div className="menu-cart-price">Rs. {menu.price}</div>
              <div className="menu-cart-quantity">
                <button
                  onClick={() => {
                    if (isInCart && quantity > 1) {
                      handleUpdateQuantity(menu.id, quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <input type="text" value={isInCart ? quantity : "1"} readOnly />
                <button
                  onClick={() => {
                    if (isInCart) {
                      handleUpdateQuantity(menu.id, quantity + 1);
                    } else {
                      handleAddToCart(menu.id, 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              <button
                className={`menu-cart-add-to-basket ${isInCart ? "added" : ""}`}
                disabled={!menu.is_available && !isInCart}
                onClick={() => {
                  if (!isInCart) {
                    handleAddToCart(menu.id, 1);
                  }
                }}
              >
                <span>
                  {isInCart
                    ? "Added"
                    : !menu.is_available
                    ? "Out of Stock"
                    : "Add to Cart"}
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
