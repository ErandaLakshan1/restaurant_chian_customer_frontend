import React from "react";
import { motion } from "framer-motion";
import "../assets/styles/pages/home_page.css";
import "../assets/styles/index.css";
import heroImage from "../assets/images/hero-iamge.svg";
import Navbar from "../components/Navbar";
import step1Img from "../assets/images/step1.svg";
import step2Img from "../assets/images/step2.svg";
import step3Img from "../assets/images/step3.svg";
import currentLocation from "../assets/images/current-location.svg";
import { useState, useEffect } from "react";
import customerFeedback from "../assets/images/cutomer-feedback.svg";
import avatar from "../assets/images/avatar.png";
import Footer from "../components/Footer";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const feedbacks = [
    {
      name: "John Doe",
      feedback: "Fantastic service and great food. I always order from here!",
      avatar: avatar,
    },
    {
      name: "Jane Smith",
      feedback:
        "The delivery was prompt and the meal was delicious. Highly recommend!",
      avatar: avatar,
    },
    {
      name: "Samuel Green",
      feedback: "Amazing variety and quality. The best place for a quick bite!",
      avatar: avatar,
    },
    {
      name: "Samuel Green",
      feedback:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet perspiciatis at vero voluptate, repudiandae officia. Ut modi unde omnis laborum sed nam, quisquam voluptatem delectus corrupti! Eum, aspernatur illo",
      avatar: avatar,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <>
      <div className="home-page-bg">
        <motion.div
          className="home-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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

      <motion.section
        className="how-it-works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2>How It Works</h2>
        <div className="steps">
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={step1Img} alt="Step 1" />
            <div className="text">
              <p className="title">01. Select Restaurant</p>
              <p className="description">
                <i>
                  Choose from a variety of restaurants available in your area.
                </i>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={step2Img} alt="Step 2" />
            <div className="text">
              <p className="title"> 02. Select Menu</p>
              <p className="description">
                <i>Browse the menu and pick your favorite dishes to order.</i>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={step3Img} alt="Step 3" />
            <div className="text">
              <p className="title">03. Wait for Delivery</p>
              <p className="description">
                <i>
                  Relax and wait as your food gets delivered to your doorstep.
                </i>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        className="feature-section"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="image-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img src={currentLocation} alt="Nearby Outlets" />
        </motion.div>
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="feature-heading">
            There are lots of outlets for you nearby
          </h3>
          <p className="feature-description">
            <i>
              Discover a wide array of dining options right in your
              neighborhood. From cozy cafes to upscale restaurants, we have
              something for everyone. Explore various cuisines and find the
              perfect spot for a casual meal or special occasion. Enjoy great
              food and service at locations just around the corner!
            </i>
          </p>
          <motion.button
            className="view-all-button"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            View All Restaurants <span className="arrow">→</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.section
        className="customers-say"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="feedback-container">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            What Customers Say About Us
          </motion.h2>
          <div className="feedbacks">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={index}
                className={`feedback ${index === currentIndex ? "active" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="feedback-message">"{feedback.feedback}"</p>
                <div className="feedback-details">
                  <img
                    src={feedback.avatar}
                    alt={`${feedback.name}'s Avatar`}
                    className="avatar"
                  />
                  <p className="customer-name">{feedback.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="image-container">
          <img src={customerFeedback} alt="Customer Experiences" />
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default Home;
