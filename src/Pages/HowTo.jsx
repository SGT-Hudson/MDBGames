import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './HowTo.css';

function HowTo() {
  return (
    <div className='howto-container'>
      <Logo className='large-logo padding-top-logo' />
      <div className='how-to-bubble'>
        <h1 className='bold centered blue-text'>How to play</h1>
        <ul>
          <li>
            <h2>
              In this game you need to navigate from one actor to another by
              just clicking
              <br /> on the screen.
            </h2>
          </li>
          <li>
            <h2>
              To finish the game, navigate through the database until you reach
              the actor
              <br /> shown in the left side of the game screen.
            </h2>
          </li>
          <li>
            <h2>
              You have all the time in the world to make your own decisions{' '}
              <span className='bold blue-text'>BUT</span> your time
              <br /> will be recorded at the end!
            </h2>
          </li>
          <li>
            <h2>
              You can end the game at any time by pressing the{' '}
              <span className='bold blue-text'>GIVE UP</span> button
              <br /> in the bottom left corner.
            </h2>
          </li>
        </ul>
      </div>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <button className='spaced-button button large-button large-shadow'>
          BACK TO MENU
        </button>
      </Link>
    </div>
  );
}

export default HowTo;
