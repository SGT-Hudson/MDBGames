import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './Menu.css';

function Menu() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      setName(
        currentUser.displayName.slice(0, currentUser.displayName.indexOf(' '))
      );
    }
  });

  return (
    <>
      <div className='menu-container'>
        <Logo className='large-logo' />
        <div className='flex-column'>
          <Link to='/newgame'>
            <button className='button large-button large-shadow'>
              START GAME
            </button>
          </Link>
          {user?.uid ? (
            <Link to='/profile'>
              <button className='button large-button large-shadow'>
                <div className='profile-div'>
                  <img
                    className='profile-pic'
                    src={user?.photoURL}
                    alt='user profile'
                  />
                  {name}
                </div>
              </button>
            </Link>
          ) : (
            <Link to='/login'>
              <button className='button large-button large-shadow'>
                LOGIN
              </button>
            </Link>
          )}

          <div className='flex-row'>
            <Link to='/howto'>
              <button className='button small-button large-text large-shadow'>
                ?
              </button>
            </Link>
            <Link to='/settings'>
              <button className='button medium-button large-shadow'>
                SETTINGS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
