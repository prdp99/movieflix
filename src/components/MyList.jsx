import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../pages/Home";
import { Link, useNavigate } from "react-router-dom";
import classes from "../pages/Results.module.css";
import { useSelector } from "react-redux";
function MyList(props) {
  let navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const { user, setUser } = useContext(UserContext);
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);

  const getData = () => {
    return user.movies.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.id}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  };

  function getTvData() {
    return user.tvShows.map((data, index) => {
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
        <h2>Movies</h2>
        <>
          {user?.movies?.length == 0 && (
            <h2 className={classes.empty}>No Items..</h2>
          )}
          {user?.movies?.length > 12 && (
            <>
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
            </>
          )}
          <div className={classes.cardContainerNext}>
            <ul className={classes.cardNext} ref={refOne}>
              {user?.movies?.length > 0 && getData()}
            </ul>
          </div>
        </>
      </main>
      <main>
        <h2>TV Shows</h2>
        <>
          {user?.tvShows?.length == 0 && (
            <h2 className={classes.empty}>No Items..</h2>
          )}

          {user?.tvShows?.length > 12 && (
            <>
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
            </>
          )}
          <div className={classes.cardContainerNext}>
            <ul className={classes.cardNext} ref={refTwo}>
              {user?.tvShows?.length > 0 && getTvData()}
            </ul>
          </div>
        </>
      </main>
    </>
  );
}

export default MyList;
