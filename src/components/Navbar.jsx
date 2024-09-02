import React from "react";
import logo from "../assets/images/logo.png";
import "../assets/styles/components/nav_bar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
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
      </div>
    </nav>
  );
};

export default Navbar;
