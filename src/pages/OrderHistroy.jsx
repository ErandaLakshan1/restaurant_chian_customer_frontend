import React, { useState, useEffect } from "react";
import "../assets/styles/pages/order_histroy.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { popAlert } from "../utils/alerts";
import Loader from "../components/Loader";
import { getOrderHistory } from "../service/order.service";
import Cart from "../components/Cart";

const OrderHistroy = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  // to get order histroy
  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const response = await getOrderHistory();
      console.log(response);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData(response.data.orders || []);
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
    fetchOrderHistory();
  }, []);
  return (
    <>
      {loading && <Loader />}

      <div className="order-history-page-bg">
        <Navbar onToggleSidePanel={togglePanel} />
        <Cart isOpen={isPanelOpen} onClose={togglePanel} />
      </div>

      <div className="order-history-content">
        {data.length === 0 ? (
          <p className="order-history-empty">No orders found.</p>
        ) : (
          data.map((order) => (
            <div key={order.id} className="order-history-item">
              <div className="order-header">
                <h2 className="order-date">
                  {new Date(order.created_at).toLocaleDateString()}
                </h2>
                <span className="order-type">{order.order_type}</span>
              </div>
              <div className="order-items">
                {order.order_items.map((item, index) => {
                  const totalPrice = item.menu_item.price * item.quantity;
                  return (
                    <div key={index} className="order-item">
                      <img
                        src={item.menu_item.images[0].image_url}
                        alt={item.menu_item.name}
                        className="order-item-image"
                      />
                      <div className="order-item-info">
                        <p className="order-item-name">{item.menu_item.name}</p>
                        <div className="order-item-details">
                          <p className="order-item-price">
                            Rs. {item.menu_item.price}
                          </p>
                          <p className="order-item-quantity">
                            Qty: {item.quantity}
                          </p>
                          <p className="order-item-total">Rs. {totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="order-summary">
                <div className="summary-row">
                  <p className="summary-label">Total:</p>
                  <p className="summary-value">Rs. {order.total_price}</p>
                </div>
                {order.coupon && (
                  <>
                    <div className="summary-row">
                      <p className="summary-label">Coupon Applied:</p>
                      <p className="summary-value">{order.coupon.code}</p>
                    </div>
                    <div className="summary-row">
                      <p className="summary-label">Discount:</p>
                      <p className="summary-value">
                        Rs. {order.discount_applied}
                      </p>
                    </div>
                  </>
                )}
                <div className="summary-row">
                  <p className="summary-label">Final Total Paid:</p>
                  <p className="summary-value">Rs. {order.final_price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistroy;
