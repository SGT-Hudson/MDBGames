import React from 'react';
import { ReactComponent as EmptyPerson } from '../images/empty_profile_photo.svg';
import { ReactComponent as EmptyMovie } from '../images/empty_movie_photo.svg';
import './Top5Item.css';

function Top5Item({ item, setNewValue }) {
  let textSize = 'large';
  if (item.name.length >= 29) textSize = 'super-small';
  else if (item.name.length >= 22) textSize = 'small';
  else if (item.name.length >= 17) textSize = 'medium';
  else textSize = 'large';

  return (
    <>
      {item ? (
        <button
          className={`portrait small-shadow top5-button`}
          onClick={() => setNewValue(['movie', item.id])}
        >
          <div>
            {item.image ? (
              <img
                className={`small-portrait-image`}
                src={item.image}
                alt={item.name}
              />
            ) : (
              <div className={`small-portrait-image empty-image`}>
                <EmptyMovie />
              </div>
            )}
          </div>
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
