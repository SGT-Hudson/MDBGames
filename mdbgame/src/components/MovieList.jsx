import React, { useEffect } from 'react';
import './MovieList.css';

function MovieList({ credits }) {
  // console.log('Credits of current actor:', credits);
  return (
    <>
      {credits.map((production) => {
        return (
          <div className='movie-container'>
            {production.character === '' ? (
              <p>
                <span className='bold'>{production.release_date}</span>
                {' ---  '}
                {production.title}
              </p>
            ) : (
              <p>
                <span className='bold'>{production.release_date}</span>
                {' ---  '}
                {production.title}
                <span className='grey-text'> as </span>
                {`${production.character}`}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}

export default MovieList;
