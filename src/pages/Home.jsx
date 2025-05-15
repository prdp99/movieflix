import axios from "axios";
import React, { useState, useEffect } from "react";
import Homepage from "./Homepage";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;
let firstRender = true;

export const UserContext = React.createContext();

function Welcome() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API}/api/refresh`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch();
  };
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API}/api/user`, {
        widthCredential: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {});

    const data = res;

    return data;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUser({
        movies: [],
        tvShows: [],
      });
    }
    if (isLoggedIn) {
      if (firstRender) {
        firstRender = false;
        sendRequest().then((data) => {
          setUser(data.user);
        });
      }
      let interval = setInterval(() => {
        refreshToken().then((data) => setUser(data.user));
      }, 1000 * 28);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Homepage />
      </UserContext.Provider>
    </>
  );
}

export default Welcome;
