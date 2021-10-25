import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MoviesList({ movies, url }) {
  const location = useLocation();
  return (
    <>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                {movie.title ? movie.title : movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

MoviesList.prototype = {
  movies: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
