import React, { useState, CSSProperties } from "react";
import "../../assets/styles/pages/auth/registration.css";
import welcomeImg from "../../assets/images/welcome.svg";
import Navbar from "../../components/Navbar";
import "../../assets/styles/index.css";
import Footer from "../../components/Footer";
import { popAlert } from "../../utils/alerts";
import { registerUser } from "../../service/auth.service";
import Loader from "../../components/Loader";

const Registration = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    nic: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.username ||
      !data.password ||
      !data.retypePassword ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.address ||
      !data.nic ||
      !data.mobileNumber
    ) {
      popAlert("Oops...", "All the fields are required!", "error");
    } else if (data.password !== data.retypePassword) {
      popAlert("Oops...", "Password does not match each other", "error");
    } else {
      setLoading(true);
      const formdata = {
        username: data.username,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        user_type: "customer",
        address: data.address,
        nic: data.nic,
        mobile_number: data.mobileNumber,
      };
      try {
        const response = await registerUser(formdata);
        if (!response.success) {
          const errorMessages = {};
          Object.keys(response.errors).forEach((key) => {
            if (
              Array.isArray(response.errors[key]) &&
              response.errors[key].length > 0
            ) {
              errorMessages[key] = response.errors[key][0];
            }
          });
          const errorMessage = Object.values(errorMessages).join(", ");
          popAlert("Oops...", errorMessage, "error");
        } else {
          setData({
            username: "",
            password: "",
            retypePassword: "",
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            nic: "",
            mobileNumber: "",
          });
          popAlert(
            "Success!",
            "Registration successful. Redirecting to login.",
            "success"
          );
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
    }
  };

  return (
    <>
      {loading ? Loader(loading) : null}
      <div className="registration-page-bg">
        <Navbar />
        <div className="registration-page">
          <div className="image-section">
            <img src={welcomeImg} alt="Registration" />
          </div>
          <div className="form-section">
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Enter your Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group form-group-row">
                <div className="form-group-half">
                  <label htmlFor="firstName">Enter Your First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-half">
                  <label htmlFor="lastName">Enter Your Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group form-group-row">
                <div className="form-group-half">
                  <label htmlFor="password">Enter a Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-half">
                  <label htmlFor="retypePassword">Re-type Password</label>
                  <input
                    type="password"
                    id="retypePassword"
                    name="retypePassword"
                    value={data.retypePassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Enter Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Enter Your Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group form-group-row">
                <div className="form-group-half">
                  <label htmlFor="nic">Enter Your NIC</label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={data.nic}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-half">
                  <label htmlFor="mobileNumber">Enter Your Mobile Number</label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={data.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p className="signin-link">
              Already have an account? <a href="/signin">Sign in here</a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Registration;
