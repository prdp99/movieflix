import { Link } from "react-router-dom";
import classes from "./Results.module.css";

function Results({ data = [], tvData = [], onSelect }) {
  const renderMediaList = (media, type) => (
    <div className={classes.cardContainerNext}>
      <ul className={classes.cardNext}>
        {media.map((item) => (
          <Link
            to={`/home/${type === "movie" ? "movies" : "tvshows"}/${item.id}`}
            key={item.id}
            onClick={() => onSelect(item)}
          >
            <li>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <span>{item.title || item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {data.length > 0 && (
        <main className={classes.main}>
          <h2>Movie Results</h2>
          {renderMediaList(data, "movie")}
        </main>
      )}

      {tvData.length > 0 && (
        <main>
          <h2>TV Results</h2>
          {renderMediaList(tvData, "tv")}
        </main>
      )}
    </>
  );
}

export default Results;
