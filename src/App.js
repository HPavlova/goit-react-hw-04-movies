import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage/MovieDetailsPage'),
);

// Если пользователь зашел по несуществующему маршруту, его необходимо перенаправлять на домашнюю страницу.

export default function App() {
  return (
    <>
      <AppBar />
      <Switch>
        <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Suspense>
      </Switch>
    </>
  );
}
