import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Menu.css';

function Menu() {
  return (
    <div className='menu-container'>
      <Logo className='large-logo' />
      <div className='flex-column'>
        <Link to='/newgame' className='button large-button'>
          START GAME{' '}
        </Link>
        <button className='button large-button'>LOGIN</button>{' '}
        {/* Login button needs to be changed to a component */}
        <div className='flex-row'>
          <Link className='button small-button large-text' to='/settings'>
            ?
          </Link>
          <button className='button medium-button'>SETTINGS</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
