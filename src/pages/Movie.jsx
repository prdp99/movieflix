import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./homepage.module.css";
import star from "../images/star.svg";
import add from "../images/add.svg";
import done from "../images/done.svg";
import { useContext } from "react";
import { UserContext } from "./Home";
import { useSelector } from "react-redux";
import axios from "axios";
function Movie(props) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { user, setUser } = useContext(UserContext);
  // const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    date: "2022",
    overview: "",
    rating: "",
    backdrop_path: "",
  });
  const [tv, setTv] = useState();
  const [movie, setMovie] = useState([]);
  let title;

  let rating;
  let newRate;
  let image;
  useEffect(() => {
    if (data == undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${props.selected.id}?api_key=c43760b116205bbb91da23670afc0fba&language=en-US`
        ).then((data) =>
          data.json().then((data) =>
            setData({
              title: data.title,
              date: data.release_date.slice(0, 4),
              overview: data.overview,
              rating: String(data.vote_average).slice(0, 3),
              backdrop_path: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            })
          )
        );
      } catch (error) {}
    }
    async function fetchTv() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${props.selected.id}?api_key=c43760b116205bbb91da23670afc0fba&language=en-US`
      ).then((data) =>
        data.json().then((data) =>
          setData({
            title: data.name,
            date: data.first_air_date.slice(0, 4),
            overview: data.overview,
            rating: String(data.vote_average).slice(0, 3),
            backdrop_path: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          })
        )
      );
    }
    if (props.selected.title !== undefined) {
      fetchMovie();
    } else {
      fetchTv();
    }

    if (props.selected.title !== undefined) {
      setMovie({
        id: props.selected.id,
        title: props.selected.title,
        poster_path: props.selected.poster_path,
        backdrop_path: props.selected.backdrop_path,
      });
    } else {
      setTv({
        id: props.selected.id,
        title: props.selected.name,
        poster_path: props.selected.poster_path,
        backdrop_path: props.selected.backdrop_path,
      });
    }

    function checkList() {
      user.movies.map((data) => {
        if (data.title == props.selected.title) {
          setBookmark(true);
          return;
        }
      });
    }

    function checkTv() {
      user.tvShows.map((data) => {
        if (data.title == props.selected.name) {
          setBookmark(true);
          return;
        }
      });
    }
    props.selected.title !== undefined ? checkList() : checkTv();
  }, []);

  let [bookmark, setBookmark] = useState(false);

  async function handleClick() {
    if (bookmark) {
      if (props.selected.title) {
        const newArr = user.movies.filter(
          (movie) => movie.title !== props.selected.title
        );
        setUser((prev) => {
          return {
            ...prev,
            movies: [...newArr],
          };
        });
      }
      if (!props.selected.title) {
        const newArr = user.tvShows.filter(
          (tv) => tv.title !== props.selected.name
        );
        setUser((prev) => {
          return {
            ...prev,
            tvShows: [...newArr],
          };
        });
      }
      setBookmark(false);
    } else {
      if (props.selected.title) {
        setUser((prev) => {
          return {
            ...prev,
            movies: [
              ...prev.movies,
              {
                title: props.selected.title,
                id: props.selected.id,
                poster_path: props.selected.poster_path,
              },
            ],
          };
        });
      }
      if (!props.selected.title) {
        setUser((prev) => {
          return {
            ...prev,
            tvShows: [
              ...prev.tvShows,
              {
                title: props.selected.name,
                id: props.selected.id,
                poster_path: props.selected.poster_path,
              },
            ],
          };
        });
      }
      setBookmark(true);
    }

    if (isLoggedIn) {
      const res = await axios
        .post(`${process.env.REACT_APP_API}/api/addToList`, {
          user: user,
          tvShows: tv,
          movies: movie,
        })
        .then((res) => {
          if (res.status == 201) {
            setBookmark(true);
          }
          if (res.status == 200) {
            setBookmark(false);
          }
        });
    }
  }
  function getData() {
    return (
      <>
        <div className={classes.coverImageInfo}>
          {isLoading ? <h2>Loading</h2> : <img src={data.backdrop_path} />}
        </div>
        <div className={classes.dark}></div>
        <div className={classes.info}>
          <h1 className={classes.title}>{data.title}</h1>

          <div className={classes.rating}>
            <img src={star} alt="star" />
            {data.rating}/10
          </div>
          <div className={classes.dates}>
            <h2> {data.date}</h2>
            <h2>{props.selected.title == undefined ? "TV Series" : "Movie"}</h2>
            <button className={classes.add} onClick={handleClick}>
              {!bookmark ? (
                <img src={add} alt="add-to-list" />
              ) : (
                <img src={done} alt="remove-from-list" />
              )}
              <p>My List</p>
            </button>
          </div>
          <h2>Overview</h2>
          <p>{data.overview}</p>
        </div>
      </>
    );
  }
  return (
    <>
      <section className={classes.coverSec}>{getData()}</section>
    </>
  );
}

export default Movie;
