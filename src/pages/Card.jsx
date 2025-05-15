import classes from "./homepage.module.css";
import arrowBack from "../images/arrow-back.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import { API_KEY } from "../lib/utils";

function Card(props) {
  let navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";
  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate("/");
    // }
    async function fetchTrending() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTrending(data.results);
        return data;
      } catch (err) { }
    }
    async function fetchPopularTv() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setTv(data.results);
      return data;
    }

    async function fetchTopRatedMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setTopRatedMovie(data.results);
      return data;
    }
    async function fetchOnAir() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setOnAir(data.results);
      return data;
    }
    fetchOnAir();
    fetchTopRatedMovie();

    fetchTrending();
    fetchPopularTv();
    // fetchCoverImage();
  }, []);

  function getTrending() {
    return trending.map((data, index) => {
      return (
        <Link to={`/home/${data.title ? data.title : data.name}`} key={index}>
          <li key={index} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title ? data.title : data.name}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getPopularTv() {
    return tv.map((data, index) => {
      return (
        <Link to={`/home/${data.name}`} key={index}>
          <li key={index} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.name}</span> */}
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
  function getTopRatedMovie() {
    return topRatedMovie.map((data, index) => {
      return (
        <Link to={`/home/${data.title}`} key={index}>
          <li key={index} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getOnAir() {
    return onAir.map((data, index) => {
      return (
        <Link to={`/home/${data.name}`} key={index}>
          <li key={index} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.name}</span> */}
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
      <div className={classes.coverImage}>
        <img src={image} />
      </div>
      <main>
        <h2>Popular on Netflix</h2>
        <div
          className={classes.slider}
          id="one"
          onClick={() => scrollLeft(refOne)}
        >
          {/* <img src={arrowBack} /> */}
        </div>
        <div
          className={classes.sliderBack}
          id="one"
          onClick={() => scrollRight(refOne)}
        ></div>
        <div className={`${classes.cardContainer} 'scroll' `}>
          <ul className={classes.card} ref={refOne}>
            {getTrending()}
          </ul>
        </div>
      </main>
      <main>
        <h2>Popular TV Shows</h2>
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
            {getPopularTv()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Top Rated Movies</h2>
        <div
          className={classes.slider}
          onClick={() => scrollLeft(refThree)}
        ></div>
        <div
          className={classes.sliderBack}
          id="one"
          onClick={() => scrollRight(refThree)}
        ></div>

        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refThree}>
            {getTopRatedMovie()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Latest Shows</h2>
        <div
          className={classes.slider}
          onClick={() => scrollLeft(refFour)}
        ></div>
        <div
          className={classes.sliderBack}
          id="one"
          onClick={() => scrollRight(refFour)}
        ></div>

        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refFour}>
            {getOnAir()}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Card;
