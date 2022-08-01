import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import { ReactComponent as Logo } from '../images/logo.svg';
import './PostGame.css';

function PostGame() {
  const location = useLocation();
  const data = location.state;
  const startingActor = data[0];
  const endingActor = data[1];
  const path = data[2];
  const time = data[3];

  const currentTime = new Date().getTime();
  const timeDiff = (currentTime - time) / 1000;
  const timeString = Math.round(timeDiff) + ' seconds';

  console.log(path);
  const initPath = path.splice(0, 1);
  const endPath = path.splice(-1);

  console.log(initPath, endPath);

  const pathString = path.join(' > ');
  console.log(pathString);

  console.log('Data from Location: ', data);

  return (
    <>
      {
        startingActor ? (
          <div>
            {/* -------------------Top logo---------------------------- */}
            <Logo className='large-logo end-logo' />
            {/* -------------------Middle section---------------------- */}
            <div className='flex-row end-middle-section'>
              <ImageContainer item={startingActor} size={'large'} />
              <div className='flex-column end-middle-section-text small-shadow'>
                <div className='flex-row top-text'>
                  <h2>Your path</h2>
                  <h2>Time: {timeString}</h2>
                </div>
                <p className='bold'>
                  {initPath}
                  <span className='unbold'>{' > ' + pathString + ' > '}</span>
                  {endPath}
                </p>
              </div>
              <ImageContainer item={endingActor} size={'large'} />
            </div>
            {/* -------------------Buttons---------------------- */}
            <div className='flex-row end-buttons'>
              <Link to='/newgame'>
                <button className='button large-button'>NEW GAME</button>
              </Link>
              <Link to='/'>
                <button className='button small-button large-text'>
                  {' '}
                  &lt;
                </button>
              </Link>
            </div>
            {/* ------------------------------------------------------- */}
          </div>
        ) : (
          <></>
        ) /* if we have no actors, load this  */
      }
    </>
  );
}

export default PostGame;
