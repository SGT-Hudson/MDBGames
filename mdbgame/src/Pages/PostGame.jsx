import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import Path from '../components/Path';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as ArrowBack } from '../images/arrow-back.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { getBestClickPath, updateUserStats, auth } from '../firebase';
import './PostGame.css';

function PostGame() {
  const [userName, setUserName] = useState(null);
  const [bestPath, setBestPath] = useState([]);
  const [bestPathName, setBestPathName] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const data = location.state;
  const startingActor = data[0];
  const endingActor = data[1];
  let path = null;
  if (data[2]) {
    path = [...data[2]];
  }
  const time = data[3];

  let displayTime;
  let timeString;

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  useEffect(() => {
    if (currentUser) {
      const getInfo = async () => {
        const { bestPath, name } = await getBestClickPath(
          auth.currentUser.uid,
          startingActor.id,
          endingActor.id,
          data[2]
        );

        let dataForUpdate = {};
        if (data[2]) {
          dataForUpdate = {
            timePlayed: time,
            clicks: data[2].length - 1,
            wins: 1,
            fails: 0,
          };
        } else {
          dataForUpdate = {
            timePlayed: 500,
            clicks: 100,
            wins: 0,
            fails: 1,
          };
        }

        const user = await updateUserStats(currentUser, dataForUpdate);
        setUserName(user.name);
        setBestPath(bestPath);
        setBestPathName(name);
      };
      getInfo();
    }
  }, [currentUser]);

  if (time > 3599) {
    displayTime = new Date(time * 1000).toISOString().slice(-13, -5);
    timeString = displayTime + ' hours';
  } else if (time > 59) {
    displayTime = new Date(time * 1000).toISOString().slice(-10, -5);
    timeString = displayTime + ' minutes';
  } else {
    timeString = time + ' seconds';
  }

  return (
    <>
      {
        startingActor ? (
          <div>
            {/* -------------------Top logo---------------------------- */}
            <Logo className='large-logo end-logo' />
            {/* -------------------Middle section---------------------- */}
            <div className='flex-row end-middle-section'>
              <ImageContainer item={startingActor} size={'large'} />
              <div>
                <Path
                  path={path}
                  time={timeString}
                  best={false}
                  userName={userName}
                />
                {path ? (
                  <Path
                    path={bestPath}
                    time={null}
                    best={true}
                    userName={bestPathName}
                    logedin={currentUser}
                  />
                ) : (
                  <></>
                )}
              </div>
              <ImageContainer item={endingActor} size={'large'} />
            </div>
            {/* -------------------Buttons---------------------- */}
            <div className='flex-row end-buttons'>
              <Link to='/newgame'>
                <button className='button large-button'>NEW GAME</button>
              </Link>
              <Link to='/'>
                <button className='button small-button large-text svg-color'>
                  <ArrowBack className='arrow-back' />
                </button>
              </Link>
            </div>
            {/* ------------------------------------------------------- */}
          </div>
        ) : (
          <></>
        ) /* if we have no actors, load this  */
      }
    </>
  );
}

export default PostGame;
