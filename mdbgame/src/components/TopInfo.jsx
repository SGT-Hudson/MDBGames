import React, { useEffect } from 'react';
import ImageContainer from './ImageContainer';
import './TopInfo.css';

function TopInfo({ top4 }) {
  console.log('TopInfo credits:', top4);

  return (
    <div className='top-info-container'>
      <h1 className='top-info-text'>Known for:</h1>
      <div className='flex-row top-info-movies'>
        {top4.map((item) => {
          return (
            <ImageContainer
              item={item}
              size={'small'}
              shadow={'small'}
              playground={true}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TopInfo;
