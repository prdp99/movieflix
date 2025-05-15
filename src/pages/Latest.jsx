import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./homepage.module.css";
import { API_KEY } from "../lib/utils";

function Latest({ onSelect }) {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestTv, setLatestTv] = useState([]);

  const refMovie = useRef(null);
  const refTv = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=2`
          ),
        ]);

        const movieData = await movieRes.json();
        const tvData = await tvRes.json();

        setLatestMovie(movieData.results || []);
        setLatestTv(tvData.results || []);
      } catch (error) {
        console.error("Failed to fetch media data:", error);
      }
    };

    fetchData();
  }, []);

  const scroll = (ref, direction = "left") => {
    const node = ref.current;
    const width = node?.clientWidth || 0;
    node.scrollLeft += direction === "left" ? -width : width;
  };

  const renderMediaList = (media, type, ref) => (
    <section className={classes.mediaSection}>
      <h2>{type === "movie" ? "Latest Movies" : "Latest TV Shows"}</h2>
      <div
        className={classes.slider}
        onClick={() => scroll(ref, "left")}
      />
      <div
        className={classes.sliderBack}
        onClick={() => scroll(ref, "right")}
      />
      <div className={classes.cardContainer}>
        <ul className={classes.card} ref={ref}>
          {media.map((item) => (
            <Link
              key={item.id}
              to={`/home/${type === "movie" ? "movies" : "tvshows"}/${item.id}`}
              onClick={() => onSelect(item)}
            >
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );

  return (
    <>
      <main className={classes.main}>
        {renderMediaList(latestMovie, "movie", refMovie)}
        {renderMediaList(latestTv, "tv", refTv)}
      </main>
    </>
  );
}

export default Latest;
