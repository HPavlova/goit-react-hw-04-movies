import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage/MovieDetailsPage'),
);
const NotFoundView = lazy(() => import('./views/NotFoundView/NotFoundView'));

export default function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}
