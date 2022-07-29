import React, { useEffect } from 'react';
import './TopInfo.css';

function TopInfo({ birthday, deathday, nationality, credits }) {
  const thisYear = new Date().getFullYear();
  deathday
    ? (deathday = `${deathday.substring(0, 4)} (Died)`)
    : (deathday = 'Alive');
  birthday
    ? (birthday = `${birthday.substring(0, 4)}`)
    : (birthday = 'Unknown');
  nationality ? (nationality = `${nationality}`) : (nationality = null);

  useEffect(() => {
    credits.sort((a, b) => {
      return a.popularity >= b.popularity ? -1 : 1;
    });
  }, [credits]);

  return (
    <div className='top-info-container small-shadow'>
      <div className='top-info-text-container flex-row'>
        <h3>
          {`Life: ${birthday} - ${deathday} `}
          <span className='grey-text'> ({thisYear - birthday} years old)</span>
        </h3>
        <h3>
          {'Born in: '}
          {nationality ? (
            { nationality }
          ) : (
            <span className='grey-text'>not available</span>
          )}
        </h3>
      </div>
      <div></div>
    </div>
  );
}

export default TopInfo;
