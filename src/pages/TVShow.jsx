import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import classes from "./homepage.module.css";
import star from "../images/star.svg";
import add from "../images/add.svg";
import done from "../images/done.svg";

import { UserContext } from "./Home";
import { API_KEY } from "../lib/utils";

function TVShow({ selected }) {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
        );
        const tvData = await res.json();
        setData({
          title: tvData.name,
          date: tvData.first_air_date?.slice(0, 4) || "Unknown",
          overview: tvData.overview,
          rating: tvData.vote_average?.toFixed(1),
          backdrop_path: `https://image.tmdb.org/t/p/original${tvData.backdrop_path}`,
        });
      } catch (error) {
        console.error("Failed to fetch TV data:", error);
      }
    };

    fetchTV();
  }, [id]);

  const handleClick = async () => {
    const title = selected?.name;

    const exists = user.tvShows.some((show) => show.title === title);
    let updatedTVShows;

    if (exists) {
      updatedTVShows = user.tvShows.filter((show) => show.title !== title);
      setBookmark(false);
    } else {
      updatedTVShows = [
        ...user.tvShows,
        {
          title: selected?.name,
          id: selected?.id,
          poster_path: selected?.poster_path,
        },
      ];
      setBookmark(true);
    }

    setUser((prev) => ({
      ...prev,
      tvShows: updatedTVShows,
    }));

    if (isLoggedIn) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/addToList`, {
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
