import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styles from '../HomePage/HomePage.module/css';

import * as API from '../../services/moviesApi';
import MoviesList from '../../components/MoviesList/MoviesList';

export default function HomePage() {
  const { url } = useRouteMatch();
  console.log(url);

  const [movies, setMovies] = useState([]);
  const page = 1;

  useEffect(() => {
    API.fetchPopularMovies(page).then(response => {
      const data = response.results;
      setMovies(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies && <MoviesList movies={movies} url={'movies'} location={'/'} />}
    </>
  );
}

HomePage.propTypes = {
  fetchPopularMovies: PropTypes.func,
};
