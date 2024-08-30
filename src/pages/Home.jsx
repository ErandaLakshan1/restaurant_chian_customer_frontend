import React from "react";
import { motion } from "framer-motion";
import "../assets/styles/pages/home_page.css";
import heroImage from "../assets/images/hero-iamge.svg";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-page-bg">
      <motion.div
        className="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Section */}
        <Navbar />
        <section className="hero-section">
          <motion.div
            className="hero-content"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <h1>The Best Restaurants In Your Home</h1>
            <p>Experience the best dining from the comfort of your home.</p>
            <motion.select className="branch-selection">
              <option>Select the branch</option>
            </motion.select>
            <motion.button
              className="order-now-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Order Now
            </motion.button>
          </motion.div>
          <motion.img
            src={heroImage}
            className="hero-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />
        </section>
      </motion.div>
    </div>
  );
};

export default Home;
