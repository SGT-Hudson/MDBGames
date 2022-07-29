import React, { useEffect } from 'react';
import './MovieList.css';

function MovieList({ credits }) {
  return (
    <>
      {credits.map((production) => {
        return (
          <div className='movie-container'>
            {production.character === '' ? (
              <>
                {production.release_date}
                {' ---  '}
                {production.title}
              </>
            ) : (
              <>
                {`${production.release_date}  -  ${production.title}`}
                <span className='grey-text'> as </span>
                {`${production.character}`}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default MovieList;
