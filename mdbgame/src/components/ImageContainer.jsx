import React from 'react';
import './ImageContainer.css';

function PortraitContainer({ actor, size }) {
  return (
    <div className={`${size}-portrait flex-column`}>
      {actor !== null ? (
        <>
          <img className='portrait-image' src={actor.image} alt={actor.name} />
          <p className='portrait-text'>{actor.name}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PortraitContainer;
