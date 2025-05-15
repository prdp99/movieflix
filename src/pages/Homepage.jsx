import classes from "./homepage.module.css";
import logo from "/images/logo.png";
import { useEffect, useRef, useState } from "react";
import TVShows from "./TVShows";
import Movies from "./Movies";
import Results from "./Results";
import Latest from "./Latest";
import MyList from "../components/MyList";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import profile from "/images/profile.jpg";
import Footer from "../components/Footer";
import Card from "./Card";
import Profile from "./Profile";
import { authActions } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Movie from "./Movie";
import { API_KEY } from "../lib/utils";
axios.defaults.withCredentials = true;

function Homepage() {
  const [selected, setSelected] = useState([]);
  const [showDropbox, setShowDropbox] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const sendLogoutReq = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API}`, null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("unable to logout..Please try again later");
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => {
      dispatch(authActions.logout());
    });
  };
  const [search, setSearch] = useState({
    title: "",
  });

  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";

  function handleChange(event) {
    const { value, name } = event.target;
    setSearch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    async function fetchdata() {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search.title}&page=1&include_adult=false`
      );
      const data = await res.json();
      setMovieData(data.results);
      navigate("/home/results", { replace: true });
      return data;
    }
    async function fetchTvData() {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${search.title}&page=1&include_adult=false`
      );
      const data = await res.json();
      setTvData(data.results);
      navigate("/home/results", { replace: true });
      return data;
    }
    fetchTvData();
    fetchdata();
  }
  function handleClick() {
    navigate("/home", { replace: true });
  }
  const refOne = useRef(null);
  const close = (e) => {
    if (refOne.current && showDropbox && !refOne.current.contains(e.target))
      setShowDropbox(false);
  };
  document.addEventListener("mousedown", close);

  return (
    <>
      <header className={classes.headerContainer}>
        <div className={classes.logo} onClick={handleClick}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.navRight}>
          <Link to="/home">Home</Link>
          <Link to="/home/tvshows ">TV Shows</Link>
          <Link to="/home/movies">Movies</Link>
          <Link to="/home/latest">Latest</Link>
          <Link to="/home/mylist">My List</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.navLeft}>
            <input
              name="title"
              type="text"
              value={search.title || ""}
              placeholder="Search"
              onChange={handleChange}
            />

            <button className="material-symbols-outlined">search</button>

            <div className={classes.dropbox_container}>
              <div
                onClick={() => setShowDropbox((prev) => !prev)}
                className={classes.avatar}
              >
                <img src={profile} alt="avatar" />
              </div>
              {showDropbox && (
                <div className={classes.dropbox} ref={refOne}>
                  <ul onClick={() => setShowDropbox((prev) => !prev)}>
                    <Link to="/home/profile">
                      <li>Profile</li>
                    </Link>
                    <Link to="/">
                      <li onClick={handleLogout}>Log out</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </form>
      </header>
      {/* <div className={classes.coverImage}>{<img src={image} />}</div> */}
      <div>
        <Routes>
          <Route
            path="/results"
            element={
              <Results
                onSelect={setSelected}
                data={movieData}
                tvData={tvData}
              />
            }
          />
          <Route path="/tvshows/:id" element={<Movie selected={selected} />} />
          <Route path="/movies/:id" element={<Movie selected={selected} />} />
          <Route path="/:id" element={<Movie selected={selected} />} />

          <Route path="/" element={<Card onSelect={setSelected} />} />
          <Route path="/tvshows" element={<TVShows onSelect={setSelected} />} />
          <Route path="/movies" element={<Movies onSelect={setSelected} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/latest" element={<Latest onSelect={setSelected} />} />
          <Route path="/mylist" element={<MyList onSelect={setSelected} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default Homepage;
