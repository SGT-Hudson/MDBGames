import React, { useEffect, useState } from 'react';
import './User.css';
import {
  signOutUser,
  createUserDocument,
  getUserDocument,
  auth,
} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import { Link } from 'react-router-dom';

function User() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOutUser();
    navigate('/');
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      setName(
        currentUser.displayName.slice(0, currentUser.displayName.indexOf(' '))
      );
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

  const avgClicks = () => {
    const avgUserClicks =
      userInfo.clicks.reduce((item, acc) => acc + item, 0) /
      userInfo.clicks.length;
    return avgUserClicks;
  };

  const avgTime = () => {
    const avgUserTime =
      userInfo.timePlayed.reduce((item, acc) => acc + item, 0) /
      userInfo.timePlayed.length;
    return avgUserTime;
  };

  return (
    <>
      <Logo className='large-logo padding-top-logo' />
      <section className='profile-section'>
        <div className='stats-bubble'>
          <h1>{name ? name : ''}'s STATS</h1>
          <div className='line long-line'></div>
          <div className='stats-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='var(--blue)'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            AVG Time per game: {userInfo ? avgTime() : ''}
          </div>
          <div className='stats-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='var(--yellow)'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
              />
            </svg>
            AVG Clicks per game: {userInfo ? avgClicks() : ''}
          </div>
          <div className='stats-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='var(--green)'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
            Total wins: {userInfo ? userInfo.wins : ''}
          </div>
          <div className='stats-item'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='var(--red)'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
            Total losses: {userInfo ? userInfo.fails : ''}
          </div>
        </div>
        <Link to='/'>
          <button className='spaced-button button large-button large-shadow'>
            BACK TO MENU
          </button>
        </Link>
        <button
          className='button large-button large-shadow reverse-button'
          onClick={handleSignOut}
        >
          LOG OUT
        </button>
      </section>
    </>
  );
}

export default User;
