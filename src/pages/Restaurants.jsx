import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RestaurantsCart from "../components/RestaurantsCart";

import "../assets/styles/pages/restaurants.css";

const Restaurants = () => {
  return (
    <>
      <div className="restaurants-page-bg">
        <Navbar />
      </div>
      <RestaurantsCart />
      <Footer />
    </>
  );
};

export default Restaurants;
