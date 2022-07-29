import React from 'react';
import { ReactComponent as Empty } from '../images/empty_profile_photo.svg';
import './ImageContainer.css';

function ImageContainer({ actor, size, position }) {
  let shadow = 'large';
  if (size === 'large-playground') {
    size = 'large';
    shadow = 'small';
  }

  let textSize;
  if (size === 'large') {
    if (actor.name.length >= 35) textSize = 'super-small';
    else if (actor.name.length >= 29) textSize = 'small';
    else if (actor.name.length >= 21) textSize = 'medium';
    else textSize = 'large';
  }
  if (size === 'small') {
    if (actor.name.length >= 29) textSize = 'super-small';
    else if (actor.name.length >= 22) textSize = 'small';
    else if (actor.name.length >= 18) textSize = 'medium';
    else textSize = 'large';
  }

  return (
    <>
      {actor !== null ? (
        <div className={`${size}-portrait ${position} ${shadow}-shadow`}>
          <div className='iner-shadow'>
            {actor.image ? (
              <img
                className={`${size}-portrait-image`}
                src={actor.image}
                alt={actor.name}
              />
            ) : (
              <div className={`${size}-portrait-image empty-image`}>
                <Empty />
              </div>
            )}
          </div>
          <p className={`${textSize}-text-image`}>{actor.name}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ImageContainer;
