import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import * as API from '../../services/moviesApi';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      return;
    }

    API.fetchMoviesSearch(query, page).then(response => {
      const data = response.results;
      console.log(data);
      setMovies(data);
    });

    setPage(prevState => prevState + 1);
    if (page !== 0) {
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.value.trim() === '') {
      toast.error('Введите название фильма');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  function onSubmit(newQuery) {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setMovies([]);
    setPage(1);

    history.push({ ...location, search: `query=${newQuery}` });
  }

  function handleScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            name="query"
            value={query}
            onChange={handleNameChange}
          />
        </form>

        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </header>

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
