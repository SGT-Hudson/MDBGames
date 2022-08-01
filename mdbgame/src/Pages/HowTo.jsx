import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './HowTo.css';

function HowTo() {
  return (
    <div className='menu-container'>
      <Logo className='large-logo' />
      <div className='how-to-bubble'>
        <Link
          to='/'
          className='ex-container'
          style={{ textDecoration: 'none' }}
        >
          <div className='ex'>X</div>
        </Link>
        <h1 className='bold centered'>How to play</h1>
        <ul>
          <li>
            <h2>
              In this game you need to navigate from one actor to another just
              clicking on the screen.
            </h2>
          </li>
          <li>
            <h2>
              Once inside the game, click on the actors and movies and navigate
              to the actor shown in <br /> the left side of the game screen to
              finish the game.
            </h2>
          </li>
          <li>
            <h2>
              You have all the time in the world to make your own decisions{' '}
              <span className='bold'>but</span> your time will be recorded at
              the end!
            </h2>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HowTo;
