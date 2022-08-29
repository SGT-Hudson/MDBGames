import React from 'react';
import { ReactComponent as EmptyActor } from '../images/empty_profile_photo.svg';
import { ReactComponent as EmptyMovie } from '../images/empty_movie_photo.svg';
import './Top5Item.css';

function Top5Item({ item, setNewValue }) {
  let textSize = 'medium';
  if (item.name.length >= 21) textSize = 'super-small';
  else if (item.name.length >= 17) textSize = 'small';

  return (
    <>
      {item ? (
        <button
          className={`portrait small-shadow top5-button`}
          onClick={() => setNewValue([item.type, item.id, item.name])}
        >
          <>
            {item.image ? (
              <img
                className={`super-small-portrait-image`}
                src={item.image}
                alt={item.name}
              />
            ) : (
              <div className={`super-small-portrait-image empty-image`}>
                {item.type === 'actor' ? <EmptyActor /> : <EmptyMovie />}
              </div>
            )}
          </>
          <div
            className={`${textSize}-text-image small-text-name text-image bold`}
          >
            {item.name}
          </div>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default Top5Item;
