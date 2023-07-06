import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const loginUser = async () => {
    const { email, password } = user;
    if (!email || !password) {
      alert("Fields are empty, Kindly fill first!!");
    } else {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Invalid Credentials !!");
        console.log("Invalid Credentials !!");
      } else {
        dispatch({ type: "USER", payload: true });
        alert("Login Successfully !!");
        console.log("Login Successfully !!");
        console.log(data);
        history("/");
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <Navbar />
        <div className="login-page-inner">
          <img
            src="https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            srcset=""
          />
          <div className="login-form">
            <h2>Login</h2>
            <input
              type="email"
              name="email"
              id="email"
              className="email"
              placeholder="Username here"
              value={user.email}
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              placeholder="Password here"
              value={user.password}
              onChange={handleInput}
            />
            <button className="btn login-here" onClick={loginUser}>
              Login
            </button>
            <p>
              Not registered yet <NavLink to="/register">register here</NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
