import classes from "./homepage.module.css";

import { useState, useEffect } from "react";

function SectionLayout() {
  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";
  useEffect(() => {
    async function fetchTrending() {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=c43760b116205bbb91da23670afc0fba"
      );
      const data = await res.json();
      setTrending(data.results);
      return data;
    }
    async function fetchPopularTv() {
      const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=1"
      );
      const data = await res.json();
      setTv(data.results);
      return data;
    }
    async function fetchTopRatedMovie() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=1"
      );
      const data = await res.json();
      setTopRatedMovie(data.results);
      return data;
    }
    async function fetchOnAir() {
      const res = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?api_key=c43760b116205bbb91da23670afc0fba&language=en-US&page=1"
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
    return trending.map((data) => {
      return (
        <li key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          <span>{data.title}</span>
        </li>
      );
    });
  }
  function getPopularTv() {
    return tv.map((data) => {
      return (
        <li key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          <span>{data.name}</span>
        </li>
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
    return topRatedMovie.map((data) => {
      return (
        <li key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          <span>{data.title}</span>
        </li>
      );
    });
  }
  function getOnAir() {
    return onAir.map((data) => {
      return (
        <li key={data.id}>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          <span>{data.name}</span>
        </li>
      );
    });
  }

  return (
    <>
      <main>
        <h2>Popular on Netflix</h2>
        <div className={classes.cardContainer}>
          <ul className={classes.card}>{getTrending()}</ul>
        </div>
      </main>
      <main>
        <h2>Popular TV Shows</h2>
        <div className={classes.cardContainer}>
          <ul className={classes.card}>{getPopularTv()}</ul>
        </div>
      </main>
      <main>
        <h2> Top Rated TV Shows</h2>
        <div className={classes.cardContainer}>
          <ul className={classes.card}>{getTopRatedMovie()}</ul>
        </div>
      </main>
      <main>
        <h2> Asian Shows</h2>
        <div className={classes.cardContainer}>
          <ul className={classes.card}>{getOnAir()}</ul>
        </div>
      </main>
    </>
  );
}

export default SectionLayout;
