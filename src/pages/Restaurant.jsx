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
import { isAuthenticated } from "../utils/authUtils";
import Reservation from "../components/Reservation";
import { getTables, resarveTable } from "../service/reservation.service";
import { removeAccessToken, removeRefreshToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { formatDateToISO } from "../utils/formatDate";
import "../assets/styles/pages/restaurant.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Restaurant = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const navigate = useNavigate();

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

  // to get tables details
  const fetchTables = async (id) => {
    setLoading(true);

    try {
      const response = await getTables(id);
      setTableData(response.data);
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
    fetchTables(id);
  }, [id]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: constants.GOOGLE_API,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return Loader(isLoaded);

  // Check if data is available and set map center
  const mapCenter = {
    lat: data?.latitude || 0,
    lng: data?.longitude || 0,
  };

  const handleReserveTable = async (tableId, date) => {
    setLoading(true);
    try {
      const formattedDate = formatDateToISO(date);

      const data = {
        reservation_date: formattedDate,
        table: tableId,
      };

      const response = await resarveTable(data);
      console.log(response);

      if (response.success) {
        popAlert(
          "Success",
          `Successfully reserved table ${tableId}.`,
          "success"
        );
      } else {
        const errorMessages = response.errors.data?.non_field_errors || [
          "An unexpected error occurred",
        ];
        const errorMessage = errorMessages.join(", ");
        popAlert("Oops...", errorMessage, "error");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        removeAccessToken();
        removeRefreshToken();
        navigate("/sign-in");
        popAlert(
          "Oops...",
          "Your session has expired. Please sign in again.",
          "error"
        );
      } else {
        popAlert(
          "Oops...",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
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

            {isAuthenticated() && (
              <button
                className="make-reservation-btn"
                onClick={() => setIsReservationModalOpen(true)}
              >
                Make a Table Reservation
              </button>
            )}
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

      <Reservation
        isOpen={isReservationModalOpen}
        onRequestClose={() => setIsReservationModalOpen(false)}
        tables={tableData}
        onReserve={handleReserveTable}
      />
    </>
  );
};

export default Restaurant;
