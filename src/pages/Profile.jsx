import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { popAlert } from "../utils/alerts";
import Loader from "../components/Loader";
import { getUserProfile, deleteUserAccount } from "../service/auth.service";
import { removeRefreshToken, removeAccessToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/profile.css";
import profileImg from "../assets/images/profile.svg";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // Fetch user profile
  const fetchUserProfile = async () => {
    setLoading(true);
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
      } else {
        setData(response.data);
      }
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
    fetchUserProfile();
  });

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await deleteUserAccount();
        removeAccessToken();
        removeRefreshToken();
        navigate("/");
        popAlert("Success", "Your account has been deleted.", "success");
      } catch (error) {
        popAlert(
          "Oops...",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="profile-page-bg">
        <Navbar />

        <div className="profile-page">
          <div className="profile-image-section">
            <img src={profileImg} alt="Profile" />
          </div>
          <div className="profile-form-section">
            <h1>Profile Details</h1>
            <form>
              <div className="profile-form-group">
                <label htmlFor="username" className="profile-form-group-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={data.username || ""}
                  readOnly
                  className="profile-form-group-input"
                />
              </div>
              <div className="profile-form-group profile-form-group-row">
                <div className="profile-form-group-half">
                  <label
                    htmlFor="firstName"
                    className="profile-form-group-label"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={data.first_name || ""}
                    readOnly
                    className="profile-form-group-input"
                  />
                </div>
                <div className="profile-form-group-half">
                  <label
                    htmlFor="lastName"
                    className="profile-form-group-label"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={data.last_name || ""}
                    readOnly
                    className="profile-form-group-input"
                  />
                </div>
              </div>
              <div className="profile-form-group">
                <label htmlFor="email" className="profile-form-group-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email || ""}
                  readOnly
                  className="profile-form-group-input"
                />
              </div>
              <div className="profile-form-group">
                <label htmlFor="address" className="profile-form-group-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={data.address || ""}
                  readOnly
                  className="profile-form-group-input"
                />
              </div>
              <div className="profile-form-group profile-form-group-row">
                <div className="profile-form-group-half">
                  <label htmlFor="nic" className="profile-form-group-label">
                    NIC
                  </label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={data.nic || ""}
                    readOnly
                    className="profile-form-group-input"
                  />
                </div>
                <div className="profile-form-group-half">
                  <label
                    htmlFor="mobileNumber"
                    className="profile-form-group-label"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={data.mobile_number || ""}
                    readOnly
                    className="profile-form-group-input"
                  />
                </div>
              </div>
              <button type="button" className="profile-update-button">
                Update Account Details
              </button>
              <button
                type="button"
                className="profile-delete-button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
