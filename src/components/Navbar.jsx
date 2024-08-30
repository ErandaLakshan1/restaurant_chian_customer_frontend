import React from "react";
import logo from "../assets/images/logo.png";
import '../assets/styles/components/nav_bar.css'

const Navbar = () => {
  return (
    <nav class="navbar">
      <div class="navbar-logo">
        <img src={logo} alt="logo" />
      </div>

      <div class="navbar-links">
        <p class="nav-item">Home</p>
        <p class="nav-item">Home</p>
        <p class="nav-item">Home</p>
        <p class="nav-item">Home</p>
      </div>

      <div class="navbar-auth">
        <p class="auth-item">Sign In</p>
        <p class="auth-item">Sign Up</p>
      </div>
    </nav>
  );
};

export default Navbar;
