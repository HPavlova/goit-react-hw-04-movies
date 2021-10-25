import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';

import * as API from '../../services/moviesApi';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const match = useRouteMatch();
  const { movieId } = match.params;

  useEffect(() => {
    API.fetcReviews(movieId).then(response => setReviews(response.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <>
      {reviews && (
        <div>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map(({ id, author, content }) => (
                <li key={id}>
                  <h4>Author: {author}</h4>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <span>We don't have any reviews for this movie.</span>
          )}
        </div>
      )}
    </>
  );
}

Reviews.prototype = { movieId: PropTypes.number };
