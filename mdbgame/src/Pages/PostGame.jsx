import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import Path from '../components/Path';
import { ReactComponent as Logo } from '../images/logo.svg';
import './PostGame.css';

function PostGame() {
  const location = useLocation();
  const data = location.state;
  const startingActor = data[0];
  const endingActor = data[1];
  const path = data[2];
  const time = data[3];
  console.log(time);

  let displayTime;
  let timeString;

  if (time > 3599) {
    displayTime = new Date(time * 1000).toISOString().slice(-13, -5);
    timeString = displayTime + ' hours';
  } else if (time > 59) {
    displayTime = new Date(time * 1000).toISOString().slice(-10, -5);
    timeString = displayTime + ' minutes';
  } else {
    timeString = time + ' seconds';
  }

  console.log('Data from Location: ', startingActor, endingActor, path, time);

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
              <div>
                <Path path={path} time={timeString} best={false} />
                <Path path={path} time={timeString} best={true} />
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
