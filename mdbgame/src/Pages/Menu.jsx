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
          <button className='large-button'>START GAME</button>
        </Link>
        <button className='large-button'>LOGIN</button>{' '}
        {/* Login button needs to be changed to a component */}
        <div className='flex-row'>
          <button className='small-button large-text'>?</button>
          <button className='medium-button'>SETTINGS</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
