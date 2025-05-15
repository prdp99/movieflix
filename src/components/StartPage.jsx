import logo from "../images/logo.png";
import GetEmail from "./GetEmail";
import classes from "./index.module.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
function StartPage() {
  const dispatch = useDispatch();
  const [guest, setGuest] = useState({
    email: "guest@mail.com",
    password: "guest123",
  });
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("./Login");
  };
  function handleDemo() {
    navigate("/home", { replace: true });
    // async function sendRequest() {
    //   const res = await axios.post(
    //     `${API_URL}/api/login`,
    //     guest
    //   );
    //   const data = await res.data;

    //   return data;
    // }
    // sendRequest()
    //   .then(() => dispatch(authActions.login()))
    //   .then(() => navigate("/home", { replace: true }));
  }
  return (
    <div className={classes.header_container}>
      <header className={classes.header}>
        <ul className={classes.lists}>
          <li>
            <img src={logo} alt="logo" className={classes.logo} />
          </li>
          <li>
            <div className={classes.btnWrapper}>
              {/* <button
                className={classes.sign_in_button}
                onClick={navigateToLogin}
              >
                Sign in
              </button> */}
              {/* <span className={classes.or}>OR</span> */}
              <button className={classes.demo} onClick={handleDemo}>
                Sign in
              </button>
            </div>
          </li>
        </ul>
        <div className={classes.welcome_title}>
          <h1 className={classes.tv_show_title}>
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className={classes.watch_title}>
            Watch anywhere. Cancel anytime.
          </h2>
          <GetEmail />
        </div>
      </header>
    </div>
  );
}

export default StartPage;
