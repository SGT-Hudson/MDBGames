import React, { useEffect } from 'react';
import Top5Item from './Top5Item';
import './TopInfo.css';

function TopInfo({ top5, setNewValue }) {
  return (
    <div className='top-info-container'>
      <h1 className='top-info-text'>Known for:</h1>
      <div className='flex-row top-info-movies'>
        {top5.map((item) => {
          return (
            <Top5Item key={item.id} item={item} setNewValue={setNewValue} />
          );
        })}
      </div>
    </div>
  );
}

export default TopInfo;
