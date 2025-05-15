import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import classes from "./homepage.module.css";
import logo from "/images/logo.png";
import profile from "/images/profile.jpg";

import TVShows from "./TVShows";
import Movies from "./Movies";
import Results from "./Results";
import Latest from "./Latest";
import MyList from "../components/MyList";
import Footer from "../components/Footer";
import Card from "./Card";
import Profile from "./Profile";
import Movie from "./Movie";
import TVShow from "./TVShow";

import { authActions } from "../store";
import { API_KEY, API_URL } from "../lib/utils";

axios.defaults.withCredentials = true;

function Homepage() {
  const [search, setSearch] = useState({ title: "" });
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showDropbox, setShowDropbox] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropboxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropboxRef.current && !dropboxRef.current.contains(e.target)) {
        setShowDropbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropbox]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const fetchMovieData = async (query) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await res.json();
    setMovieData(data.results);
  };

  const fetchTvData = async (query) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const data = await res.json();
    setTvData(data.results);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = search.title;
    await Promise.all([fetchMovieData(query), fetchTvData(query)]);
    navigate("/home/results", { replace: true });
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_URL}`, null);
      if (res.status === 200) {
        dispatch(authActions.logout());
      }
    } catch {
      console.error("Logout failed");
    }
  };

  const handleLogoClick = () => navigate("/home", { replace: true });

  return (
    <>
      <header className={classes.headerContainer}>
        <div className={classes.logo} onClick={handleLogoClick}>
          <img src={logo} alt="logo" />
        </div>

        <div className={classes.navRight}>
          <Link to="/home">Home</Link>
          <Link to="/home/tvshows">TV Shows</Link>
          <Link to="/home/movies">Movies</Link>
          <Link to="/home/latest">Latest</Link>
          <Link to="/home/mylist">My List</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={classes.navLeft}>
            <input
              name="title"
              type="text"
              value={search.title}
              placeholder="Search"
              onChange={handleChange}
            />
            <button className="material-symbols-outlined">search</button>

            <div className={classes.dropbox_container}>
              <div
                className={classes.avatar}
                onClick={() => setShowDropbox((prev) => !prev)}
              >
                <img src={profile} alt="avatar" />
              </div>

              {showDropbox && (
                <div className={classes.dropbox} ref={dropboxRef}>
                  <ul onClick={() => setShowDropbox(false)}>
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

      <main>
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
          <Route path="/tvshows/:id" element={<TVShow selected={selected} />} />
          <Route path="/movies/:id" element={<Movie selected={selected} />} />
          <Route path="/:id" element={<Movie selected={selected} />} />
          <Route path="/" element={<Card onSelect={setSelected} />} />
          <Route path="/tvshows" element={<TVShows onSelect={setSelected} />} />
          <Route path="/movies" element={<Movies onSelect={setSelected} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/latest" element={<Latest onSelect={setSelected} />} />
          <Route path="/mylist" element={<MyList onSelect={setSelected} />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default Homepage;
