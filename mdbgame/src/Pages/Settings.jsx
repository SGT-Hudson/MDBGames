import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Settings.css';

function Settings() {
  return (
    <div className='menu-container'>
      <Logo className='large-logo' />
      <div className='flex-column'>
        <div className='flex-row'>
          <button className='non-button medium-button'>SETTINGS</button>

          <Link to='/'>
            <button className='button small-button large-text'>&lt;</button>
          </Link>
        </div>

        <button className='button large-button'>Work In Progress</button>

        {/* Login button needs to be changed to a component */}
      </div>
    </div>
  );
}

export default Settings;
