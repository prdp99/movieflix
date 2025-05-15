import classes from "./homepage.module.css";
import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Movies(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [airingTv, setAiringTv] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const API_KEY = process.env.API_KEY;
  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";
  useEffect(() => {
    async function fetchTopRated() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
        );
        const data = await res.json();
        setTopRated(data.results);
        setIsLoading(false);
        return data;
      } catch (error) {}
    }
    async function fetchPopular() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=2"
      );
      const data = await res.json();
      setPopular(data.results);
      return data;
    }
    async function fetchLatest() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=2"
      );
      const data = await res.json();
      setLatest(data.results);
      return data;
    }
    async function fetchAiringTv() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=1"
      );
      const data = await res.json();
      setAiringTv(data.results);
      return data;
    }
    fetchAiringTv();
    fetchTopRated();
    fetchLatest();
    fetchPopular();
    // fetchCoverImage();
  }, []);

  function getTopRated() {
    return topRated.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getPopular() {
    return popular.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getCoverImage() {
    return (
      <img
        src={`https://image.tmdb.org/t/p/original${coverImage.backdrop_path}`}
      />
    );
  }
  function getLatest() {
    return latest.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getAiringTv() {
    return airingTv.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);
  const refFour = useRef(null);
  function scrollLeft(refOne) {
    const node = refOne.current;
    let width = node.clientWidth;
    node.scrollLeft = node.scrollLeft - width;
  }

  function scrollRight(refOne) {
    const node = refOne.current;
    let width = node.clientWidth;
    node.scrollLeft = node.scrollLeft + width;
  }

  return (
    <>
      <main className={classes.main}>
        <h2>Popular Movies</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refOne)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refOne)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refOne}>
            {getPopular()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Latest Movies</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refTwo)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refTwo)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refTwo}>
            {getLatest()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Trending Movies</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refThree)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refThree)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refThree}>
            {getAiringTv()}
          </ul>
        </div>
      </main>
      <main>
        <h2>Top Rated Movies</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refFour)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refFour)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refFour}>
            {getTopRated()}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Movies;
