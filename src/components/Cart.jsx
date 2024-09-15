import React, { useState, useEffect } from "react";
import "../assets/styles/components/cart.css";
import Loader from "./Loader";
import { popAlert } from "../utils/alerts";
import {
  getCartItmes,
  updateCart,
  removeItems,
  deleteCart,
} from "../service/order.service";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const navigate = useNavigate();

  //to fetch the cart items
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await getCartItmes();
      if (response && response.data) {
        setCartItems(
          Array.isArray(response.data.items) ? response.data.items : []
        );
        setCartId(response.data.id);
      } else {
        setCartItems([]);
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

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  // to update the cart item
  const handleUpdateCart = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    console.log("Updating item:", itemId, "with quantity:", newQuantity);
    try {
      const result = await updateCart(itemId, { quantity: newQuantity });
      if (result.success) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        popAlert(
          "Update Failed",
          result.errors.general || "An error occurred while updating the cart.",
          "error"
        );
      }
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred while updating the cart. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // to remove item from the cart
  const handleRemoveItem = async (itemId) => {
    setLoading(true);
    try {
      const result = await removeItems(itemId);
      if (result.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        popAlert(
          "Item Removed",
          "The item has been removed from your cart.",
          "success"
        );
      } else {
        popAlert(
          "Removal Failed",
          result.errors.general || "An error occurred while removing the item.",
          "error"
        );
      }
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred while removing the item. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // to delete the cart
  const handleDeleteCart = async () => {
    setLoading(true);
    try {
      const result = await deleteCart();
      if (result.success) {
        setCartItems([]);
        popAlert(
          "Cart Cleared",
          "All items have been removed from your cart.",
          "success"
        );
        window.location.reload();
      } else {
        popAlert(
          "Deletion Failed",
          result.errors.general || "An error occurred while clearing the cart.",
          "error"
        );
      }
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred while clearing the cart. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-panel ${isOpen ? "open" : ""}`}>
        <button className="cart-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="cart-header">
          <h2 className="cart-title">Cart Items</h2>
          <button
            className="cart-delete-btn"
            onClick={handleDeleteCart}
            disabled={loading}
            title="Clear Cart"
          >
            🗑️
          </button>
        </div>
        <ul className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  alt={item.menu_item.name}
                  className="cart-item-image"
                  src={item.menu_item.images[0].image_url}
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.menu_item.name}</h3>
                  <div className="cart-item-price">
                    Rs. {item.menu_item.price * item.quantity}
                  </div>
                </div>
                <button
                  className="cart-item-remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ×
                </button>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
                    disabled={loading || item.quantity <= 1}
                  >
                    -
                  </button>
                  <div className="cart-item-quantity-number">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="cart-item">Ooops.... Cart is empty</li>
          )}
        </ul>
        {cartItems.length > 0 ? (
          <>
            <button
              className="place-order-btn"
              onClick={() => {
                navigate(`/place-order?cartId=${cartId}`);
              }}
            >
              Place Order
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Cart;
