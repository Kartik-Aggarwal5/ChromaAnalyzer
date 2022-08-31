import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast } from "react-toastify";
import {
  SIGNUP,
  EMPLOYEE,
  SALES_MANAGER,
  INVENTORY_MANAGER,
  PURCHASING_MANAGER,
  CUSTOMER,
} from "../api";
import "../styles/login.css";

const Register = () => {
  const history = useHistory();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [ssn, setSSN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const validatingPassword = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      if (password === confirmPassword) {
        const payload = {
          email: email,
          password: password,
          role: role,
        };

        const information = {
          // emp_id: ssn,
          emp_ssn: ssn,
          emp_email: email,
          emp_phone: Phone,
          emp_des: role,
          emp_fname: firstname,
          emp_lname: lastname,
          emp_gender: gender,
          // user_id: email,
        };
        const cust_information = {
          // emp_id: ssn,
          c_ssn: ssn,
          c_email: email,
          c_phone: Phone,
          c_fname: firstname,
          c_lname: lastname,
          c_address: "",
          // user_id: email,
        };

        try {
          const user = await axios.post(SIGNUP, payload);
          console.log("User", user);
          if (
            user &&
            user.data.code == "200" &&
            email &&
            email.split("@")[1] === "paintforus.com"
          ) {
            const emp = await axios.post(EMPLOYEE, information);
            console.log("employee", emp);
            if (
              emp &&
              emp.data.code == "200" &&
              email &&
              email.split("@")[1] === "paintforus.com"
            ) {
              if (role === "Sales Manager") {
                const sales_manager_data = await axios.post(SALES_MANAGER, {
                  ssn: ssn,
                });
                if (
                  sales_manager_data &&
                  sales_manager_data.data.code == "200"
                ) {
                  toast.success("Sign Up Sucessfull.");
                }
                console.log("sales_manager_data", sales_manager_data);
              } else if (role === "Inventory Manager") {
                const inventory_manager_data = await axios.post(
                  INVENTORY_MANAGER,
                  {
                    ssn: ssn,
                  }
                );
                if (
                  inventory_manager_data &&
                  inventory_manager_data.data.code == "200"
                ) {
                  toast.success("Sign Up Sucessfull.");
                }
                console.log("inventory_manager_data", inventory_manager_data);
              } else if (role === "Purchase Manager") {
                const purchasing_manager_data = await axios.post(
                  PURCHASING_MANAGER,
                  {
                    ssn: ssn,
                  }
                );
                if (
                  purchasing_manager_data &&
                  purchasing_manager_data.data.code == "200"
                ) {
                  toast.success("Sign Up Sucessfull.");
                }
                console.log("purchasing_manager_data", purchasing_manager_data);
              }
            }
          } else if (user && user.data.code == "200") {
            const customer = await axios.post(CUSTOMER, cust_information);
            if (customer && customer.data.code == "200") {
              toast.success("Sign Up Sucessfull.");
            }
            console.log("customer", customer);
          }
        } catch (err) {
          toast.error("Some Error Occurred. Please try again later.");
          console.log(err);
        }
      } else {
        setPasswordCheck(true);
      }
    } else {
      setEmailCheck(true);
    }
    history.push("/");
  };

  const options = ["Sales Manager", "Inventory Manager", "Purchase Manager"];
  const gen = ["Male", "Female"];

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
                {/* <div className="row mb-4 px-3"></div> */}

                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">First Name</h6>
                  </label>{" "}
                  <input
                    // className={emailCheck ? "validate" : ""}
                    type="text"
                    name="first"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="First Name"
                  />{" "}
                </div>

                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Last Name</h6>
                  </label>{" "}
                  <input
                    // className={emailCheck ? "validate" : ""}
                    type="text"
                    name="last"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name"
                  />{" "}
                </div>

                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Phone Number</h6>
                  </label>{" "}
                  <input
                    // className={emailCheck ? "validate" : ""}
                    type="text"
                    name="phone"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                  />{" "}
                </div>

                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">SSN</h6>
                  </label>{" "}
                  <input
                    // className={passwordCheck ? "validate" : ""}
                    type="password"
                    name="ssn"
                    value={ssn}
                    onChange={(e) => setSSN(e.target.value)}
                    placeholder="Enter SSN"
                  />{" "}
                </div>

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
                    className={passwordCheck ? "validate" : ""}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />{" "}
                </div>
                <div className="row px-3 mb-4">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Confirm Password</h6>
                  </label>{" "}
                  <input
                    className={passwordCheck ? "validate" : ""}
                    type="password"
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re Enter password"
                  />{" "}
                  {passwordCheck ? (
                    <b className="text-danger">
                      Password matching incorrect. Please try again
                    </b>
                  ) : (
                    ""
                  )}
                </div>
                {email ? (
                  email.split("@")[1] === "paintforus.com" ? (
                    <div className="row px-3 mb-4 role">
                      {" "}
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Role</h6>
                      </label>{" "}
                      <Dropdown
                        options={options}
                        onChange={(e) => setRole(e.value)}
                        value={""}
                        placeholder="Select an option"
                      />
                    </div>
                  ) : null
                ) : null}

                <div className="row px-3 mb-4 role">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Gender</h6>
                  </label>{" "}
                  <Dropdown
                    options={gen}
                    onChange={(e) => setGender(e.value)}
                    value={""}
                    placeholder="Select an option"
                  />
                </div>

                <div className="row mb-3 px-3">
                  {" "}
                  <button
                    type="submit"
                    onClick={() => validatingPassword()}
                    className="btn btn-blue text-center"
                  >
                    Register
                  </button>{" "}
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

export default Register;
