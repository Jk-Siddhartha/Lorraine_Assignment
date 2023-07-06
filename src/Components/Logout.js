import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        history("/login", { replace: true });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Navbar />
    </>
  );
};

export default Logout;
