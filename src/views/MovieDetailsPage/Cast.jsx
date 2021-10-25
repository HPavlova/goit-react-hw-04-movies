import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';

import * as API from '../../services/moviesApi';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const match = useRouteMatch();
  const { movieId } = match.params;

  useEffect(() => {
    API.fetchCast(movieId).then(response => setCast(response.cast));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <>
      {cast && (
        <div>
          {cast.length > 0 ? (
            <ul>
              {cast.map(({ id, name, profile_path, character }) => (
                <li key={id}>
                  {profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                      alt={name}
                      width="80px"
                    />
                  )}
                  <p>{name}</p>
                  <p>Character: {character}</p>
                </li>
              ))}
            </ul>
          ) : (
            <span>N/A</span>
          )}
        </div>
      )}
    </>
  );
}

Cast.prototype = { movieId: PropTypes.number };
