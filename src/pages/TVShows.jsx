import classes from "./homepage.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { API_KEY } from "../lib/utils";
function TVShows(props) {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [airingTv, setAiringTv] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";
  useEffect(() => {
    async function fetchTopRated() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setTopRated(data.results);
        setIsLoading(false);
        return data;
      } catch {}
    }
    async function fetchPopular() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=2`
      );
      const data = await res.json();
      setPopular(data.results);
      return data;
    }
    async function fetchLatest() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=2`
      );
      const data = await res.json();
      setLatest(data.results);
      return data;
    }
    async function fetchAiringTv() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      setAiringTv(data.results);
      return data;
    }
    setTimeout(() => {
      fetchTopRated();
      fetchAiringTv();
      fetchLatest();
      fetchPopular();
    }, 1000);

    // fetchCoverImage();
  }, []);

  function getTopRated() {
    return topRated.map((data,index) => {
      return (
        <Link to={`/home/tvshows/${data.id}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.name}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getPopular() {
    return popular.map((data,index) => {
      return (
        <Link to={`/home/tvshows/${data.id}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
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
  function getLatest() {
    return latest.map((data,index) => {
      return (
        <Link to={`/home/tvshows/${data.id}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.name}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getAiringTv() {
    return airingTv.map((data,index) => {
      return (
        <Link to={`/home/tvshows/${data.id}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
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
      <main className={classes.main}>
        <h2>Top Rated TV Shows</h2>
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
            {getTopRated()}
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
            {getAiringTv()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Latest TV Shows</h2>
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
            {getLatest()}
          </ul>
        </div>
      </main>
      <main>
        <h2> Currently Airing TV Shows</h2>
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
            {getAiringTv()}
          </ul>
        </div>
      </main>
    </>
  );
}
export default TVShows;
