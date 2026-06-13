import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Arrows } from '../images/arrows.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { ReactComponent as ArrowBack } from '../images/arrow-back.svg';

import ImageContainer from '../components/ImageContainer';

import { newGame } from '../api_calls';
import './GameInit.css';

// Placeholder card shown while the actor data and photos are loading.
function SkeletonCard() {
  return (
    <div className='portrait large-portrait large-shadow skeleton-card'>
      <div className='large-portrait-image skeleton-block' />
      <div className='skeleton-line' />
    </div>
  );
}

function GameInit() {
  const [actors, setActors] = useState([null, null]);
  const [photosReady, setPhotosReady] = useState(false);
  const [error, setError] = useState(false);

  // Re-roll the pair of actors. Guards against a failed/hung request so the
  // screen never gets stuck blank.
  const createNewGame = async () => {
    setError(false);
    setPhotosReady(false);
    setActors([null, null]);
    try {
      const newGameResponse = await newGame();
      setActors(newGameResponse);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    createNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep showing the skeletons until both photos have actually downloaded.
  useEffect(() => {
    if (!actors[0]) {
      setPhotosReady(false);
      return;
    }
    const urls = actors.map((a) => a && a.image).filter(Boolean);
    if (urls.length === 0) {
      setPhotosReady(true);
      return;
    }
    let active = true;
    let loaded = 0;
    const done = () => {
      loaded += 1;
      if (active && loaded >= urls.length) setPhotosReady(true);
    };
    urls.forEach((url) => {
      const img = new Image();
      img.onload = done;
      img.onerror = done;
      img.src = url;
    });
    return () => {
      active = false;
    };
  }, [actors]);

  const handleRandomize = () => {
    createNewGame();
  };

  const showCards = actors[0] && photosReady;
  const showSkeleton = !error && !showCards;

  return (
    <div className='start-container'>
      {/* -------------------Top logo---------------------------- */}
      <Logo className='large-logo' />
      {/* -------------------Explanation------------------------- */}
      <p className='game-intro'>
        {error
          ? "Couldn't load the actors. Please try again."
          : 'Get from the first actor to the second by hopping through the movies they starred in and the actors that appear in them.'}
      </p>
      {/* -------------------Middle section---------------------- */}
      <div className='flex-row start-middle-section'>
        {showCards ? (
          <ImageContainer item={actors[0]} size={'large'} position={'left'} />
        ) : showSkeleton ? (
          <SkeletonCard />
        ) : null}

        <div className='arrows desktop-arrows'>
          <Arrows />
        </div>
        <Arrow className='mobile-arrow' />

        {showCards ? (
          <ImageContainer item={actors[1]} size={'large'} position={'right'} />
        ) : showSkeleton ? (
          <SkeletonCard />
        ) : null}
      </div>
      {/* -------------------Bottom buttons---------------------- */}
      <div className='flex-row start-buttons'>
        <Link to='/'>
          <button className='button small-button large-text svg-color large-shadow'>
            <ArrowBack className='arrow-back' />
          </button>
        </Link>

        <button
          className='button small-button large-shadow'
          onClick={handleRandomize}
          aria-label='Randomize actors'
        >
          <svg
            className='randomize-icon'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </button>

        {showCards ? (
          <Link to='/game' state={actors}>
            <button className='button large-button large-shadow'>
              START GAME
            </button>
          </Link>
        ) : (
          <button className='button large-button large-shadow' disabled>
            START GAME
          </button>
        )}
      </div>
    </div>
  );
}
export default GameInit;
