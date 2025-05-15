import classes from "./Results.module.css";
import { Link } from "react-router-dom";
function Results(props) {
  const data = props.data;
  const tvData = props.tvData;
  function getData() {
    return data.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            <span>{data.title}</span>
          </li>
        </Link>
      );
    });
  }
  function getTvData() {
    return tvData.map((data, index) => {
      return (
        <Link to={`/home/tvshows/${data.name}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            <span>{data.name}</span>
          </li>
        </Link>
      );
    });
  }
  return (
    <>
      <main className={classes.main}>
        <h2>Movie Results</h2>
        <div className={classes.cardContainerNext}>
          <ul className={classes.cardNext}>{getData()}</ul>
        </div>
      </main>
      <main>
        <h2>TV Results</h2>
        <div className={classes.cardContainerNext}>
          <ul className={classes.cardNext}>{getTvData()}</ul>
        </div>
      </main>
    </>
  );
}

export default Results;
