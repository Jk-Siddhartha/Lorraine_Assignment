// Navbar.js
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../App";

const Navbar = () => {
  const { state, dipatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <NavLink to="/cart" className="navlink">
            Cart
          </NavLink>
          <NavLink to="/logout" className="navlink logout btn" replace>
            Logout
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/login" className="navlink">
            Login
          </NavLink>
          <NavLink to="/register" className="navlink">
            Register
          </NavLink>
          <NavLink to="/cart" className="navlink">
            Cart
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <NavLink className="logo navlink" to="/">
        E-Commerce
      </NavLink>
      <div className="menus">
        <RenderMenu />
      </div>
    </div>
  );
};

export default Navbar;
