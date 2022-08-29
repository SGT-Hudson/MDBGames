import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Settings.css';

function Settings() {
  return (
    <>
      <div className='menu-container'>
        <Logo className='large-logo' />
        <div className='flex-column'>
          <button className='non-button large-button large-shadow'>
            SETTINGS
          </button>

          <button className='button large-button'>Work In Progress</button>
          <Link to='/'>
            <button className='spaced-button button large-button large-shadow'>
              BACK TO MENU
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Settings;
