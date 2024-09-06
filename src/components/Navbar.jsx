import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import "../assets/styles/components/nav_bar.css";
import { NavLink } from "react-router-dom";
import {
  isAuthenticated,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import avtart from "../assets/images/avatar.png";
import cartIcon from "../assets/images/cart-icon.svg";

const Navbar = ({ onToggleSidePanel }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-links">
          <p className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </p>
          <p className="nav-item">
            <NavLink
              to="/restaurants"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Restaurants
            </NavLink>
          </p>
          <p className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </p>
          <p className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </p>
        </div>

        <div className="navbar-auth">
          {isAuthenticated() ? (
            <div className="navbar-user">
              <button className="navbar-cart-btn" onClick={onToggleSidePanel}>
                <img src={cartIcon} alt="cart" />
              </button>
              <img
                src={avtart}
                alt="User Avatar"
                className="user-avatar"
                onClick={handleDropdownToggle}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-close"
                    onClick={handleDropdownToggle}
                  >
                    ×
                  </button>
                  <NavLink
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/order-history"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Order History
                  </NavLink>
                  <NavLink
                    to="/order-history"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Your Reservations
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="dropdown-item-signout"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="auth-item">
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign In
                </NavLink>
              </p>
              <p className="auth-item">
                <NavLink
                  to="/sign-up"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign Up
                </NavLink>
              </p>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
