import React from 'react';
import { ReactComponent as Empty } from '../images/empty_profile_photo.svg';
import './ImageContainer.css';

function ImageContainer(props) {
  console.log(props);
  const item = props.item;
  let size = props.size;
  const position = props.position || '';
  const shadow = props.shadow || 'large';

  let textSize;
  if (size === 'large') {
    if (item.name.length >= 35) textSize = 'super-small';
    else if (item.name.length >= 29) textSize = 'small';
    else if (item.name.length >= 21) textSize = 'medium';
    else textSize = 'large';
  }
  if (size === 'small') {
    if (item.name.length >= 29) textSize = 'super-small';
    else if (item.name.length >= 22) textSize = 'small';
    else if (item.name.length >= 17) textSize = 'medium';
    else textSize = 'large';
  }

  return (
    <>
      {item ? (
        <div
          className={`portrait ${size}-portrait ${position} ${shadow}-shadow`}
        >
          <div>
            {item.image ? (
              <img
                className={`${size}-portrait-image`}
                src={item.image}
                alt={item.name}
              />
            ) : (
              <div className={`${size}-portrait-image empty-image`}>
                <Empty />
              </div>
            )}
          </div>
          <div
            className={`${textSize}-text-image ${size}-text-name text-image bold`}
          >
            {item.name}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ImageContainer;
