import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserDocument } from '../firebase';
import { ReactComponent as Empty } from '../images/empty_profile_photo.svg';
import './Menu.css';

function Menu() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      if (userInfo) {
        if (user.displayName) {
          setName(user.displayName.slice(0, user.displayName.indexOf(' ')));
        } else setName(userInfo.name);
      }
    }
  });
  useEffect(() => {
    if (user) {
      const getInfo = async () => {
        const getUserInfo = await getUserDocument(user.uid);
        setUserInfo(getUserInfo);
      };
      getInfo();
    }
  }, [user]);

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
              <button className='large-button large-shadow profile-button'>
                {user ? (
                  <div className='profile-div'>
                    {user.photoURL === null ? (
                      <Empty className='profile-pic' />
                    ) : (
                      <img
                        className='profile-pic'
                        src={user.photoURL}
                        alt='user profile'
                      />
                    )}
                    {name}
                  </div>
                ) : null}
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
