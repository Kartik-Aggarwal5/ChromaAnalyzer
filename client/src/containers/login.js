import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LOGIN, GET_ROLE } from "../api";
import "../styles/login.css";

const Login = () => {
  const history = useHistory();
  const [emailCheck, setEmailCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginCheck = async () => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      const payload = {
        email: email,
        password: password,
      };
      try {
        const data = await axios.post(LOGIN, payload);
        console.log("data", data);
        if (data.data && data.data.message == "Login Successful") {
          localStorage.setItem("email", email);
          toast.success("Logged in successfully.");
          if (email.split("@")[0].includes("admin")) {
            history.push("/admin");
          } else {
            const getRole = await axios.get(`${GET_ROLE}?email=${email}`);
            console.log("1", getRole);
            console.log("2", getRole.data);
            if (getRole.data && getRole.data[0]) {
              console.log("22", getRole.data[0]);
              console.log("23", getRole.data[0].emp_des);
              if (getRole.data[0].emp_des === "Sales Manager") {
                history.push("/sales-dashboard");
              } else if (getRole.data[0].emp_des === "Inventory Manager") {
                history.push("/inventory-dashboard");
              } else if (getRole.data[0].emp_des === "Purchase Manager") {
                history.push("/purchase-dashboard");
              }
            } else {
              history.push("/customer-dashboard");
            }
            console.log(getRole);
          }
        }
      } catch (err) {
        toast.error("Error occured. Please try again Later.");
        console.log(err);
        setEmailCheck(true);
      }
    } else {
      setEmailCheck(true);
    }
  };

  return (
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {" "}
                  <img
                    src="https://i.imgur.com/CXQmsmF.png"
                    className="logo"
                    alt=""
                  />{" "}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {" "}
                  <img
                    src="https://i.imgur.com/uNGdWHi.png"
                    className="image"
                    alt=""
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                <div className="row mb-4 px-3"></div>

                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Email Address</h6>
                  </label>{" "}
                  <input
                    className={emailCheck ? "validate" : ""}
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter a valid email address"
                  />{" "}
                  {emailCheck ? (
                    <b className="text-danger">
                      Please enter a valid email address
                    </b>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label>{" "}
                  <input
                    className={emailCheck ? "validate" : ""}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />{" "}
                  {emailCheck ? (
                    <b className="text-danger">
                      Please enter a correct password
                    </b>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row px-3 mb-4">
                  <div className="custom-control custom-checkbox custom-control-inline">
                    {" "}
                    <input
                      id="chk1"
                      type="checkbox"
                      name="chk"
                      className="custom-control-input"
                    />{" "}
                    <label
                      htmlFor="chk1"
                      className="custom-control-label text-sm"
                    >
                      Remember me
                    </label>{" "}
                  </div>{" "}
                  <a href="#" className="ml-auto mb-0 text-sm">
                    Forgot Password?
                  </a>
                </div>
                <div className="row mb-3 px-3">
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-blue text-center"
                    onClick={() => loginCheck()}
                  >
                    Login
                  </button>{" "}
                </div>

                <div className="row mb-4 px-3">
                  {" "}
                  <small className="font-weight-bold">
                    Don't have an account?{" "}
                    <Link to="/signin" className="text-danger ">
                      Register
                    </Link>
                  </small>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              {" "}
              <small className="ml-4 ml-sm-5 mb-2">
                Copyright &copy; 2021. All rights reserved.
              </small>
              <div className="social-contact ml-4 ml-sm-auto">
                {" "}
                <span className="fa fa-facebook mr-4 text-sm"></span>{" "}
                <span className="fa fa-google-plus mr-4 text-sm"></span>{" "}
                <span className="fa fa-linkedin mr-4 text-sm"></span>{" "}
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
