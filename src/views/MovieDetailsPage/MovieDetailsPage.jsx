import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { Route, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieDetailsPage.module.css';

import * as API from '../../services/moviesApi';
const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();

  const { name, genres, title, poster_path, vote_average, overview } = movies;

  useEffect(() => {
    API.fetchMoviesDetails(movieId).then(response => setMovies(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const goBack = () => history.push(location?.state?.from?.location ?? '/');

  return (
    <>
      <button type="button" onClick={goBack} className={styles.btn__goBack}>
        go back
      </button>

      {movies && (
        <>
          <div className={styles.card__movie}>
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={title ? title : name}
                className={styles.card__movie__poster}
              />
            )}
            <div className={styles.card__movie_desc}>
              <h2 className={styles.card__movie_title}>
                {title ? title : name}
              </h2>
              <p>User Score: {vote_average} %</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              {genres && genres.length > 0 ? (
                <ul>
                  {genres.map(({ id, name }) => (
                    <li key={id}>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
          <hr />
          <div>
            <h4>Additional information</h4>
            <nav>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state ? location.state.from : '/' },
                }}
                className={styles.card__movie_link}
                activeClassName={styles.card__movie_activeLink}
              >
                Cast
              </NavLink>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state ? location.state.from : '/' },
                }}
                className={styles.card__movie_link}
                activeClassName={styles.card__movie_activeLink}
              >
                Reviews
              </NavLink>
            </nav>
          </div>
          <hr />
          <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
            <Switch>
              <Route exact path={`${path}/cast`}>
                {movies && <Cast />}
              </Route>
              <Route exact path={`${path}/reviews`}>
                {movies && <Reviews />}
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}

MovieDetailsPage.prototype = { movieId: PropTypes.number };
