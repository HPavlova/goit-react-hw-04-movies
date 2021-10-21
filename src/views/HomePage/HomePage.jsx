import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styles from '../HomePage/HomePage.module/css';

import * as API from '../../services/moviesApi';

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    API.fetchPopularMovies(page).then(response => {
      const data = response.results;
      setMovies(data);
    });

    setPage(prevState => prevState + 1);
    if (page !== 0) {
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>
                {movie.title ? movie.title : movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

HomePage.propTypes = {
  fetchPopularMovies: PropTypes.func,
};
