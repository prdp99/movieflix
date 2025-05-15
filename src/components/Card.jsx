import logo from "../images/logo.png";
import { useState } from "react";
import classes from "./card.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/utils";
function Card(props) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [guest, setGuest] = useState({
    email: "guest@mail.com",
    password: "guest123",
  });

  const [user, setUser] = useState({
    email: props.email,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setIsError(false);
  }
  const sendRequest = async () => {
    const url = props.isSignUp ? "signup" : "login";
    try {
      const res = await axios.post(
        `${API_URL}/api/${url}`,
        user
      );
      const data = await res.data;
      return data;
    } catch (error) {
      if (error.response.status == 400) {
        setMessage("user already exist");
        return error;
      }
    }
  };
  function handleSubmit(event) {
    event.preventDefault();
    if (props.isSignUp) {
      if (user.password === user.confirmPassword) {
        try {
          const res = sendRequest().then((res) => {
            if (res.response.status === 400) {
              setIsError(true);
            }
            if (res.response.status === 201) {
              navigate("/login", { replace: true });
            }
          });
        } catch (error) {}
      } else {
        setIsError(true);
        setMessage("password not matching");
      }
    } else {
      try {
        const res = sendRequest().then((res) => {
          if (res.response.status === 200) {
            dispatch(authActions.login());
            navigate("/home", { replace: true });
          } else {
            setIsError(true);
            setMessage("faled to login");
          }
        });
      } catch (err) {}
    }
  }
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
    <>
      <div className={classes.login_container}>
        <header className={classes.header}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/home">
            <button className={classes.demo} onClick={handleDemo}>
              Demo
            </button>
          </Link>
        </header>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.input_container}>
            <h2>{props.name}</h2>
            <label className={classes.email}>
              <input
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                type="email"
                required
                placeholder=" "
                className={classes.for_email}
              />
              <p className={classes.placeholder}>Email or phone number</p>
            </label>
            <label className={classes.password}>
              <input
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                type="password"
                required
                placeholder=" "
              />
              <p className={classes.placeholder}>Password</p>
            </label>
            {props.isSignUp && (
              <label className={classes.password}>
                <input
                  name="confirmPassword"
                  value={user.confirmPassword || ""}
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder=" "
                />
                <p className={classes.placeholder}>Confirm Password</p>
              </label>
            )}
            <button>{props.name}</button>
            <div className={classes.checkbox_container}>
              {isError && <span className={classes.error}>*{message}</span>}
              <label className={classes.checkbox}>
                <div>
                  <input type="checkbox" name="" value="" />
                </div>
                <p>Remember me</p>
              </label>
              <label className={classes.checkbox}>
                <div>
                  <input type="checkbox" name="" value="" />
                </div>
                <p>Need Help?</p>
              </label>
            </div>
            <div className={classes.sign_up_link}>
              <p>{props.text}</p>
              <Link to={props.isSignUp ? "/Login" : "/signup"}>
                {props.isSignUp ? "Log in now" : "Sign up now"}
              </Link>
            </div>
            <div className={classes.captcha_text}>
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. <a href="./learn">Learn more.</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Card;
