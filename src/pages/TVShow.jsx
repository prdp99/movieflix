import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import classes from "./homepage.module.css";
import star from "../images/star.svg";
import add from "../images/add.svg";
import done from "../images/done.svg";

import { UserContext } from "./Home";
import { API_KEY, API_URL } from "../lib/utils";

function TVShow({ selected }) {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  console.log('user', user)

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
        );
        const tvData = await res.json();
        setData({
          id: tvData.id,
          title: tvData.name,
          date: tvData.first_air_date?.slice(0, 4) || "Unknown",
          overview: tvData.overview,
          rating: tvData.vote_average?.toFixed(1),
          backdrop_path: `https://image.tmdb.org/t/p/original${tvData.backdrop_path}`,
          poster_path: tvData?.poster_path
        });
      } catch (error) {
        console.error("Failed to fetch TV data:", error);
      }
    };

    const checkBookmark = () => {
      const exists = user?.tvShows?.find((show) => show.id === Number(id));
      setBookmark(Boolean(exists));
    };

    checkBookmark()
    fetchTV();
  }, [id, bookmark, user]);

  const handleClick = async () => {

  

    setUser((prev) => ({
      ...prev,
      tvShows: [...prev.tvShows, data],
    }))

    setBookmark(true)

    if (isLoggedIn) {
      try {
        const res = await axios.post(`${API_URL}/api/addToList`, {
          user,
          tvShows: updatedTVShows,
          movies: user.movies,
        });

        if (res.status === 201) setBookmark(true);
        if (res.status === 200) setBookmark(false);
      } catch (err) {
        console.error("Failed to update list:", err);
      }
    }
  };

  if (!data) {
    return <h2 className={classes.loading}>Loading...</h2>;
  }

  return (
    <section className={classes.coverSec}>
      <div className={classes.coverImageInfo}>
        <img src={data.backdrop_path} alt={data.title} />
      </div>
      <div className={classes.dark}></div>
      <div className={classes.info}>
        <h1 className={classes.title}>{data.title}</h1>
        <div className={classes.rating}>
          <img src={star} alt="rating" />
          {data.rating}/10
        </div>
        <div className={classes.dates}>
          <h2>{data.date}</h2>
          <h2>TV Series</h2>
          <button className={classes.add} onClick={handleClick}>
            <img src={bookmark ? done : add} alt="bookmark" />
            <p>My List</p>
          </button>
        </div>
        <h2>Overview</h2>
        <p>{data.overview}</p>
      </div>
    </section>
  );
}

export default TVShow;
