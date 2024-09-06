import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RestaurantsCart from "../components/RestaurantsCart";

import "../assets/styles/pages/restaurants.css";
import Cart from "../components/Cart";

const Restaurants = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  return (
    <>
      <div className="restaurants-page-bg">
        <Navbar onToggleSidePanel={togglePanel} />
        <Cart isOpen={isPanelOpen} onClose={togglePanel} items={""} />
      </div>
      <RestaurantsCart />
      <Footer />
    </>
  );
};

export default Restaurants;
