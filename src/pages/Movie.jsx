import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./homepage.module.css";
import star from "../images/star.svg";
import add from "../images/add.svg";
import done from "../images/done.svg";
import { UserContext } from "./Home";
import { API_URL } from "../lib/utils";

function Movie({ selected }) {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c43760b116205bbb91da23670afc0fba&language=en-US`
        );
        const movieData = await res.json();
        setData({
          title: movieData.title,
          date: movieData.release_date?.slice(0, 4) || "Unknown",
          overview: movieData.overview,
          rating: movieData.vote_average?.toFixed(1),
          backdrop_path: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
        });
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const isMovie = Boolean(selected?.title);

  const handleClick = async () => {
    const listType = isMovie ? "movies" : "tvShows";
    const titleKey = isMovie ? "title" : "name";

    const alreadyExists = user[listType].some(
      (item) => item.title === selected?.[titleKey]
    );

    let updatedList = [];

    if (alreadyExists) {
      updatedList = user[listType].filter(
        (item) => item.title !== selected?.[titleKey]
      );
      setBookmark(false);
    } else {
      updatedList = [
        ...user[listType],
        {
          title: selected?.[titleKey],
          id: selected?.id,
          poster_path: selected?.poster_path,
        },
      ];
      setBookmark(true);
    }

    setUser((prev) => ({
      ...prev,
      [listType]: updatedList,
    }));

    if (isLoggedIn) {
      try {
        const res = await axios.post(`${API_URL}/api/addToList`, {
          user,
          tvShows: listType === "tvShows" ? updatedList : user.tvShows,
          movies: listType === "movies" ? updatedList : user.movies,
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
          <h2>{isMovie ? "Movie" : "TV Series"}</h2>
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

export default Movie;
