import React, { useState } from "react";
import "../../assets/styles/pages/auth/login.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { popAlert } from "../../utils/alerts";
import Loader from "../../components/Loader";
import LoginImg from "../../assets/images/login-in.svg";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../service/auth.service";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../utils/authUtils";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      popAlert("Oops...", "All the fields are required!", "error");
    } else {
      setLoading(true);

      const formdata = {
        username: data.username,
        password: data.password,
      };

      try {
        const response = await loginUser(formdata);
        if (!response.success) {
          popAlert("Oops...", response.errors.detail, "error");
        } else {
          setData({
            username: "",
            password: "",
          });

          setAccessToken(response.data.access);
          setRefreshToken(response.data.refresh);
          navigate("/");
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
      <div className="login-page-bg">
        <Navbar />
        <div className="login-page">
          <div className="img-section">
            <img src={LoginImg} alt="Login" />
          </div>

          <div className="div form-section">
            <h1>Sign In Form</h1>
            <form onSubmit={handlesubmit}>
              <div className="form-group">
                <label htmlFor="username" className="lg-form-group-label">
                  Enter Your Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  className="form-group-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="username" className="lg-form-group-label">
                  Enter Your Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="form-group-input"
                />
              </div>
              <button className="sign-in-button">Sign In</button>
            </form>
            <p className="singup-link">
              Don't have an account?{" "}
              <NavLink to={"/sign-up"}>Sign up here</NavLink>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
