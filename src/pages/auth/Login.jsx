import React, { useState } from "react";
import "../../assets/styles/pages/auth/login.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { popAlert } from "../../utils/alerts";
import Loader from "../../components/Loader";
import LoginImg from "../../assets/images/login-in.svg";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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
            <form>
              <div className="form-group">
                <label htmlFor="username" className="lg-form-group-label">
                  Enter Your Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={data.username}
                  className="input form-group-input"
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
                  className="input form-group-input"
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
