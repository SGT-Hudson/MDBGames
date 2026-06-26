import React from 'react';
import { ReactComponent as EmptyActor } from '../images/empty_profile_photo.svg';
import { ReactComponent as EmptyMovie } from '../images/empty_movie_photo.svg';
import './Top5Item.css';

function Top5Item({ item, setNewValue }) {
  if (!item) return <></>;

  let textSize = 'medium';
  if (item.name.length >= 21) textSize = 'super-small';
  else if (item.name.length >= 17) textSize = 'small';

  // Movies/TV carry a release date; actors don't, so the year pill only shows
  // where it makes sense.
  const year = item.release_date ? `${item.release_date}`.slice(0, 4) : null;

  return (
    <button
      className='portrait small-shadow top5-button'
      onClick={() => setNewValue([item.type, item.id, item.name])}
    >
      <div className='top5-poster'>
        {item.image ? (
          <img
            className='super-small-portrait-image'
            src={item.image}
            alt={item.name}
          />
        ) : (
          <div className='super-small-portrait-image empty-image'>
            {item.type === 'actor' ? <EmptyActor /> : <EmptyMovie />}
          </div>
        )}
        {year ? <span className='year-pill'>{year}</span> : null}
      </div>
      <div className={`${textSize}-text-image small-text-name text-image bold`}>
        {item.name}
      </div>
    </button>
  );
}

export default Top5Item;
