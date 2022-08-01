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

  const currentTime = new Date().getTime();
  const timeDiff = (currentTime - time) / 1000;
  const timeString = Math.round(timeDiff) + ' seconds';

  console.log(path);

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
