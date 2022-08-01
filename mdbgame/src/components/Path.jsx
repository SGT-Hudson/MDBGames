import React from 'react';
import './Path.css';

function Path({ path, time, best }) {
  const initPath = path.splice(0, 1);
  const endPath = path.splice(-1);
  const pathString = path.join(' > ');
  return (
    <div className='end-middle-section-text large-shadow'>
      <div className='flex-row top-text'>
        {best ? <h2>Best path</h2> : <h2>Your path</h2>}
        <h2>Time: {time}</h2>
      </div>
      <p className='bold path'>
        {initPath}
        <span className='unbold'>{' > ' + pathString + ' > '}</span>
        {endPath}
      </p>
    </div>
  );
}

export default Path;
