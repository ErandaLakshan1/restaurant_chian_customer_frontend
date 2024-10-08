import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "react-modal";

import Home from "./pages/Home";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistroy from "./pages/OrderHistroy";

AOS.init();
Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Registration />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<Restaurant />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/order-history" element={<OrderHistroy />} />
    </Routes>
  </BrowserRouter>
);
