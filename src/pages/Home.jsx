import React, { useState, useEffect } from "react";
import "../assets/styles/pages/home_page.css";
import "../assets/styles/index.css";
import heroImage from "../assets/images/hero-iamge.svg";
import Navbar from "../components/Navbar";
import step1Img from "../assets/images/step1.svg";
import step2Img from "../assets/images/step2.svg";
import step3Img from "../assets/images/step3.svg";
import currentLocation from "../assets/images/current-location.svg";
import customerFeedback from "../assets/images/cutomer-feedback.svg";
import avatar from "../assets/images/avatar.png";
import Footer from "../components/Footer";
import { getAllBranches } from "../service/branch.service";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [branches, setBranches] = useState([]);

  const feedbacks = [
    {
      name: "John Doe",
      feedback: "Fantastic service and great food. I always order from here!",
      avatar,
    },
    {
      name: "Jane Smith",
      feedback:
        "The delivery was prompt and the meal was delicious. Highly recommend!",
      avatar,
    },
    {
      name: "Samuel Green",
      feedback: "Amazing variety and quality. The best place for a quick bite!",
      avatar,
    },
    {
      name: "Samuel Green",
      feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      avatar,
    },
  ];

  // to get all the branches
  const fetchBranches = async () => {
    try {
      const response = await getAllBranches();
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <>
      <div className="home-page-bg">
        <div className="home-page">
          <Navbar />
          <section className="hero-section" data-aos="fade-up">
            <div
              className="hero-content"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h1>The Best Restaurants In Your Home</h1>
              <p>Experience the best dining from the comfort of your home.</p>
              <select className="branch-selection">
                <option>Select the branch</option>
                {branches.map((branch) => {
                  return (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  );
                })}
              </select>
              <button className="order-now-button">Order Now</button>
            </div>
            <img
              src={heroImage}
              className="hero-image"
              alt="Hero"
              data-aos="fade-left"
            />
          </section>
        </div>
      </div>

      <section className="how-it-works" data-aos="fade-up" data-aos-delay="300">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step" data-aos="fade-right" data-aos-delay="100">
            <img src={step1Img} alt="Step 1" />
            <div className="text">
              <p className="title">01. Select Restaurant</p>
              <p className="description">
                <i>
                  Choose from a variety of restaurants available in your area.
                </i>
              </p>
            </div>
          </div>
          <div className="step" data-aos="fade-right" data-aos-delay="200">
            <img src={step2Img} alt="Step 2" />
            <div className="text">
              <p className="title">02. Select Menu</p>
              <p className="description">
                <i>Browse the menu and pick your favorite dishes to order.</i>
              </p>
            </div>
          </div>
          <div className="step" data-aos="fade-right" data-aos-delay="300">
            <img src={step3Img} alt="Step 3" />
            <div className="text">
              <p className="title">03. Wait for Delivery</p>
              <p className="description">
                <i>
                  Relax and wait as your food gets delivered to your doorstep.
                </i>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="feature-section" data-aos="fade-up" data-aos-delay="400">
        <div className="image-content" data-aos="fade-right">
          <img src={currentLocation} alt="Nearby Outlets" />
        </div>
        <div className="text-content" data-aos="fade-left">
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
          <button className="view-all-button">
            View All Restaurants <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <section
        className="customers-say"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="feedback-container">
          <h2>What Customers Say About Us</h2>
          <div className="feedbacks">
            {feedbacks.map((feedback, index) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
        <div className="image-container">
          <img src={customerFeedback} alt="Customer Experiences" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
