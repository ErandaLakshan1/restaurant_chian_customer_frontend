import React, { useState, useEffect } from "react";
import { popAlert } from "../utils/alerts";
import Loader from "./Loader";
import "../assets/styles/components/restaurants_cart.css";
import { getAllBranches } from "../service/branch.service";
import noImg from "../assets/images/no-img.jpg";

const RestaurantsCart = () => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);

  // to get all the branch details
  const fetchBranches = async () => {
    setLoading(true);

    try {
      const response = await getAllBranches();
      setBranches(response.data);
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <>
      {loading ? Loader(loading) : null}
      <div className="rcart-container">
        {branches.map((branch) => {
          return (
            <div
              className="rcart-card"
              data-aos="fade-up"
              data-aos-delay="200"
              key={branch.id}
            >
              <img
                src={
                  branch.images[0]?.image_url
                    ? branch.images[0]?.image_url
                    : noImg
                }
                alt={`${branch.name} image`}
              />
              <div className="rcart-card-content">
                <h2>{branch.name}</h2>
                <p>{branch.description}</p>
              </div>

              <div className="rcart-view-more-container">
                <button className="rcart-view-more-btn">
                  View more
                  <span className="arrow">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantsCart;
