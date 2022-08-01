import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Menu.css';

function Menu() {
  return (
    <div className='menu-container'>
      <Logo className='large-logo' />
      <div className='flex-column'>
        <Link to='/newgame'>
          <button className='button large-button'>START GAME</button>
        </Link>
        <Link to='/newgame'>
          <button className='button large-button'>LOGIN</button>{' '}
        </Link>
        {/* Login button needs to be changed to a component */}
        <div className='flex-row'>
          <Link to='/howto'>
            <button className='button small-button large-text'>?</button>
          </Link>
          <Link to='/settings'>
            <button className='button medium-button'>SETTINGS</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
