// import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
// import styles from './MovieDetailsPage.module.css';

import Cast from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  return (
    <>
      <Switch>
        <Route patch="/movies/:movieId/cast">
          <Cast />
        </Route>

        <Route patch="/movies/:movieId/reviews">
          <Reviews />
        </Route>
      </Switch>
    </>
  );
}
