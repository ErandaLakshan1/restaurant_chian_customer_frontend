import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getBranchDetails } from "../service/branch.service";
import Loader from "../components/Loader";
import { popAlert } from "../utils/alerts";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Menu from "../components/Menu";
import constants from "../constants";
import GalleryModal from "../components/GalleryModal";

import "../assets/styles/pages/restaurant.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Restaurant = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //to get the branch details
  const fetchBranchDetails = async (id) => {
    setLoading(true);

    try {
      const response = await getBranchDetails(id);
      setData(response.data);
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
    fetchBranchDetails(id);
  }, [id]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: constants.GOOGLE_API,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // Check if data is available and set map center
  const mapCenter = {
    lat: data?.latitude || 0,
    lng: data?.longitude || 0,
  };

  return (
    <>
      {loading && Loader(loading)}
      <div className="restaurant-page-bg">
        <Navbar />

        <div className="restaurant-container" data-aos="fade-up">
          <div
            className="restaurant-left-section"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="restaurant-title">
              <h1>{data?.name || "Loading..."}</h1>
            </div>

            <p className="restaurant-address">
              Address: {data?.address || "Loading..."}
            </p>
            <p className="restaurant-address">Ratings: 4.5</p>
            <p className="restaurant-description">
              {data?.description || "Loading..."}
            </p>
            <button
              className="view-gallery-btn"
              onClick={() => setIsModalOpen(true)}
            >
              View Gallery
            </button>
          </div>
          <div
            className="restaurant-right-section"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="restaurant-map-container">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <Menu branchId={id} />
        <Footer />
      </div>

      {data && (
        <GalleryModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          images={data.images || []}
        />
      )}
    </>
  );
};

export default Restaurant;
