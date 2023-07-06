import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Register = () => {
  const history = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const registerUser = async (e) => {
    const { name, email, phone, password, cpassword } = userData;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password, cpassword }),
    });

    const data = await res.json();
    if (data.status === 422 || !data || data.error) {
      alert("Invalid registration");
      console.log("Invalid registration");
    } else {
      alert("registration successful !!");
      console.log("registration successful !!");
      history("/login");
    }
  };
  return (
    <>
      <div className="register-page">
        <Navbar />
        <div className="register-page-inner">
          <img
            src="https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            srcset=""
          />
          <div className="register-form">
            <h2>Register</h2>
            <input
              type="text"
              name="name"
              id="name"
              className="name"
              placeholder="Name here"
              onChange={handleInput}
              value={userData.name}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email here"
              className="email"
              onChange={handleInput}
              value={userData.email}
            />
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone Here"
              onChange={handleInput}
              value={userData.phone}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              placeholder="Password here"
              onChange={handleInput}
              value={userData.password}
            />

            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className="password"
              placeholder="Confirm Password here"
              onChange={handleInput}
              value={userData.cpassword}
            />
            <button
              className="btn login-here register-here"
              onClick={registerUser}
            >
              Register
            </button>
            <p>
              Already registered go <NavLink to="/login">Login here</NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
