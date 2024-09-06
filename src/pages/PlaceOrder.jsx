import React, { useState } from "react";
import "../assets/styles/pages/place_order.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { popAlert } from "../utils/alerts";
import Loader from "../components/Loader";
import Cart from "../components/Cart";
import placeOrderImg from "../assets/images/place-order.svg";
import { useLocation } from "react-router-dom";
import { placeOrder } from "../service/order.service";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const [formData, setFormData] = useState({
    houseNumber: "",
    apartmentNumber: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    orderType: "",
    couponCode: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cartId = queryParams.get("cartId");
  console.log(cartId);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.orderType) {
      popAlert("Oops...", "Order type is manadtory", "error");
    }

    setLoading(true);

    const data = {
      cart_id: cartId,
      order_type: formData.orderType,
      coupon_code: formData.couponCode,
    };

    console.log(data);
    try {
      const response = await placeOrder(data);

      console.log(response);

      if (response.success) {
        popAlert(
          "Success",
          "Your order has been placed successfully.",
          "success"
        );
        navigate("/");
      } else {
        popAlert("Error", response.errors.detail, "error");
      }
    } catch (error) {
      popAlert(
        "Error",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}

      <div className="place-order-page-bg">
        <Navbar onToggleSidePanel={togglePanel} />
        <Cart isOpen={isPanelOpen} onClose={togglePanel} />
      </div>

      <div className="place-order-page">
        <div className="place-order-image-section">
          <img
            src={placeOrderImg}
            alt="Place Order"
            className="place-order-image"
          />
        </div>

        <div className="place-order-form-section">
          <h1 className="place-order-heading">Place Your Order</h1>
          <form className="place-order-form" onSubmit={handleSubmit}>
            <fieldset className="place-order-fieldset">
              <legend className="place-order-legend">Delivery Address</legend>
              <div className="place-order-form-row">
                <div className="place-order-form-group">
                  <label htmlFor="house-number" className="place-order-label">
                    House Number:
                  </label>
                  <input
                    type="text"
                    id="house-number"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    required
                    className="place-order-input"
                  />
                </div>
                <div className="place-order-form-group">
                  <label
                    htmlFor="apartment-number"
                    className="place-order-label"
                  >
                    Apartment Number:
                  </label>
                  <input
                    type="text"
                    id="apartment-number"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleChange}
                    className="place-order-input"
                  />
                </div>
              </div>
              <div className="place-order-form-row">
                <div className="place-order-form-group">
                  <label htmlFor="street" className="place-order-label">
                    Street:
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="place-order-input"
                  />
                </div>
                <div className="place-order-form-group">
                  <label htmlFor="city" className="place-order-label">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="place-order-input"
                  />
                </div>
              </div>
              <div className="place-order-form-row">
                <div className="place-order-form-group">
                  <label htmlFor="zip-code" className="place-order-label">
                    Zip Code:
                  </label>
                  <input
                    type="text"
                    id="zip-code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="place-order-input"
                  />
                </div>
                <div className="place-order-form-group">
                  <label htmlFor="country" className="place-order-label">
                    Country:
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="place-order-input"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="place-order-fieldset">
              <legend className="place-order-legend">Order Type</legend>
              <div className="place-order-form-row">
                <div className="place-order-form-group">
                  <input
                    type="radio"
                    id="dine-in"
                    name="orderType"
                    value="Dine In"
                    checked={formData.orderType === "Dine In"}
                    onChange={handleChange}
                    required
                    className="place-order-radio"
                  />
                  <label htmlFor="dine-in" className="place-order-radio-label">
                    Dine In
                  </label>
                </div>
                <div className="place-order-form-group">
                  <input
                    type="radio"
                    id="take-away"
                    name="orderType"
                    value="Take Away"
                    checked={formData.orderType === "Take Away"}
                    onChange={handleChange}
                    className="place-order-radio"
                  />
                  <label
                    htmlFor="take-away"
                    className="place-order-radio-label"
                  >
                    Take Away
                  </label>
                </div>
                <div className="place-order-form-group">
                  <input
                    type="radio"
                    id="delivery"
                    name="orderType"
                    value="Delivery"
                    checked={formData.orderType === "Delivery"}
                    onChange={handleChange}
                    className="place-order-radio"
                  />
                  <label htmlFor="delivery" className="place-order-radio-label">
                    Delivery
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className="place-order-fieldset">
              <legend className="place-order-legend">Coupon Code</legend>
              <label htmlFor="coupon-code" className="place-order-label">
                Enter your coupon code:
              </label>
              <input
                type="text"
                id="coupon-code"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleChange}
                className="place-order-input"
              />
            </fieldset>

            <button type="submit" className="place-order-submit-button">
              Place Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;
