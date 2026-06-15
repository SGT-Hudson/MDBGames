import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import Path from '../components/Path';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { ReactComponent as ArrowBack } from '../images/arrow-back.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { getBestClickPath, updateUserStats, auth } from '../firebase';
import { formatDuration } from '../meta';
import './PostGame.css';

function PostGame() {
  const [bestPath, setBestPath] = useState([]);
  const [bestPathName, setBestPathName] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [bestIsMine, setBestIsMine] = useState(false);
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

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  useEffect(() => {
    if (currentUser) {
      const getInfo = async () => {
        const { bestPath, name, time: best, isMine } = await getBestClickPath(
          auth.currentUser.uid,
          startingActor.id,
          endingActor.id,
          data[2],
          time
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

        await updateUserStats(currentUser, dataForUpdate);
        setBestPath(bestPath);
        setBestPathName(name);
        setBestTime(best);
        setBestIsMine(isMine);
      };
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const timeString = formatDuration(time);
  const won = Boolean(data[2]);
  const clicks = data[2] ? data[2].length - 1 : null;

  // Highlight the nodes of the player's path that also appear in the best path.
  const commonNodes =
    won && bestPath && bestPath.length && !bestIsMine
      ? new Set(path.filter((node) => bestPath.includes(node)))
      : null;
  const bestClicks = bestPath && bestPath.length ? bestPath.length - 1 : null;

  return (
    <>
      {startingActor ? (
        <div className='end-container'>
          {/* -------------------Top logo---------------------------- */}
          <Logo className='large-logo end-logo' />

          {/* -------------------Result------------------------------ */}
          <h1 className={`end-result ${won ? 'won' : 'lost'}`}>
            {won ? 'YOU WON!' : 'YOU GAVE UP'}
          </h1>

          {/* -------------------Start -> End------------------------ */}
          <div className='flex-row end-actors'>
            <ImageContainer item={startingActor} size={'large'} />
            <Arrow className='end-arrow' />
            <ImageContainer item={endingActor} size={'large'} />
          </div>

          {/* ----When the player already holds the best path-------- */}
          {currentUser && bestIsMine && bestPath && bestPath.length ? (
            <div className='best-banner'>🏆 You hold the best path!</div>
          ) : null}

          {/* -------------------Paths------------------------------- */}
          <div className='end-paths'>
            {won ? (
              <Path
                path={path}
                time={timeString}
                clicks={clicks}
                best={false}
                highlight={commonNodes}
              />
            ) : (
              <p className='time-wasted'>Time wasted: {timeString}</p>
            )}
            {currentUser && !bestIsMine && bestPath && bestPath.length ? (
              <Path
                path={bestPath}
                best={true}
                userName={bestPathName}
                time={formatDuration(bestTime)}
                clicks={bestClicks}
              />
            ) : null}
          </div>

          {/* -------------------Buttons----------------------------- */}
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PostGame;
