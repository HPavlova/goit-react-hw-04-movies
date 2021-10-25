import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import * as API from '../../services/moviesApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchForm from '../../components/SearchForm/SearchForm';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const page = 1;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!query) {
      return;
    }

    history.push({ ...location, search: `search=${query}` });

    API.fetchMoviesSearch(query, page).then(response => {
      const data = response.results;

      if (data === 0) {
        console.log('error');
      }
      setMovies(prevState => [...prevState, ...data]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const getLocationSearch = new URLSearchParams(location.search).get(
      'search',
    );
    setQuery(getLocationSearch);
  }, [location.search]);

  function onSubmit(newQuery) {
    console.log(newQuery);

    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setMovies([]);
  }

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {movies && <MoviesList movies={movies} url={'movies'} />}
    </>
  );
}
