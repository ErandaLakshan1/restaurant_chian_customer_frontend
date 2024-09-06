import React from "react";
import "../assets/styles/components/cart.css";

const Cart = ({ isOpen, onClose, items }) => {
  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-panel ${isOpen ? "open" : ""}`}>
        <button className="cart-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="cart-title">Cart Items</h2>
        <ul className="cart-list">
          <li className="cart-item">
            <img
              alt="Meal with egg, kiwi, and sauce chilli"
              className="cart-item-image"
              src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-Hh5RPsKhtBPsWCFSiEKnUJ6x/user-8qgiVpCV0U0b7zDjfFInHgjl/img-bUTOjhP7rKcjkaHF5dAWtfCD.png?st=2024-09-06T10%3A10%3A14Z&amp;se=2024-09-06T12%3A10%3A14Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-05T21%3A36%3A37Z&amp;ske=2024-09-06T21%3A36%3A37Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=kRQSoJi3lcPmOmbc9s4tRqAle4X9D%2BR24DsZHthnpaw%3D"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-title">Egg, kiwi and sauce chilli</h3>
              <div className="cart-item-price">$39</div>
            </div>
            <button className="cart-item-remove-btn">×</button>
            <div className="cart-item-quantity">
              <button>-</button>
              <div className="cart-item-quantity-number">2</div>
              <button>+</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Cart;
