import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";
import Welcome from "./Welcome";
import { API_URL } from "../lib/utils";
axios.defaults.withCredentials = true;
function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const sendLogoutReq = async () => {
    const res = await axios.post(
      `${API_URL}/api/logout`,
      null,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res;
    }
    return new Error("unable to Logout");
  };

  function handleLogout() {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  }
  return (
    <>
      <h2>THis is header</h2>
      {isLoggedIn && (
        <Link onClick={handleLogout} to="/">
          Logout
        </Link>
      )}
      <Welcome />
    </>
  );
}

export default Navbar;
