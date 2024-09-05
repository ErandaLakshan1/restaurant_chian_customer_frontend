import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { popAlert } from "../utils/alerts";
import Loader from "../components/Loader";
import { getUserProfile } from "../service/auth.service";
import { removeRefreshToken, removeAccessToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/profile.css";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // to get user profile
  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (!response.success) {
        removeAccessToken();
        removeRefreshToken();
        navigate("/");
        popAlert(
          "Oops...",
          "An unexpected error occurred. Please Sign In again.",
          "error"
        );
      }
      setData(response.data);
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      {loading && Loader(loading)}
      <div className="profile-page-bg">
        <Navbar />
      </div>
    </>
  );
};

export default Profile;
