import React from 'react';
import './ImageContainer.css';

function ImageContainer({ actor, size, position }) {
  const textSize = actor.name.length > 20 ? ' small-text' : '';

  return (
    <>
      {actor !== null ? (
        <div className={`${size}-portrait ${position}`}>
          <div className='iner-shadow'>
            <img
              className={`${size}-portrait-image`}
              src={actor.image}
              alt={actor.name}
            />
          </div>
          <p className={`portrait-text${textSize}`}>{actor.name}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ImageContainer;
