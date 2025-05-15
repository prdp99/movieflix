import classes from "./homepage.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_KEY } from "../lib/utils";

function Card({ onSelect }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [onAir, setOnAir] = useState([]);

  const image = "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, tvRes, topRatedRes, onAirRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`),
        ]);

        const [trendingData, tvData, topRatedData, onAirData] = await Promise.all([
          trendingRes.json(),
          tvRes.json(),
          topRatedRes.json(),
          onAirRes.json(),
        ]);

        setTrending(trendingData.results || []);
        setTv(tvData.results || []);
        setTopRatedMovie(topRatedData.results || []);
        setOnAir(onAirData.results || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  const renderItems = (items, type = "mixed") =>
    items.map((data) => {
      const path = type === "movie"
        ? `/home/movie/${data.id}`
        : type === "tv"
        ? `/home/tvshows/${data.id}`
        : `/home/${data.media_type === "tv" ? "tvshows" : "movies"}/${data.id}`;

      return (
        <Link to={path} key={data.id}>
          <li onClick={() => onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />
          </li>
        </Link>
      );
    });

  const createScrollHandlers = (ref) => ({
    scrollLeft: () => {
      const node = ref.current;
      if (node) node.scrollLeft -= node.clientWidth;
    },
    scrollRight: () => {
      const node = ref.current;
      if (node) node.scrollLeft += node.clientWidth;
    },
  });

  const CarouselSection = ({ title, items, type, refObj }) => {
    const { scrollLeft, scrollRight } = createScrollHandlers(refObj);
    return (
      <main>
        <h2>{title}</h2>
        <div className={classes.slider} onClick={scrollLeft}></div>
        <div className={classes.sliderBack} onClick={scrollRight}></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refObj}>
            {renderItems(items, type)}
          </ul>
        </div>
      </main>
    );
  };

  const refTrending = useRef(null);
  const refTv = useRef(null);
  const refTopRated = useRef(null);
  const refOnAir = useRef(null);

  return (
    <>
      <div className={classes.coverImage}>
        <img src={image} alt="Cover" />
      </div>

      <CarouselSection
        title="Popular on Netflix"
        items={trending}
        type="mixed"
        refObj={refTrending}
      />

      <CarouselSection
        title="Popular TV Shows"
        items={tv}
        type="tv"
        refObj={refTv}
      />

      <CarouselSection
        title="Top Rated Movies"
        items={topRatedMovie}
        type="movie"
        refObj={refTopRated}
      />

      <CarouselSection
        title="Latest Shows"
        items={onAir}
        type="tv"
        refObj={refOnAir}
      />
    </>
  );
}

export default Card;
