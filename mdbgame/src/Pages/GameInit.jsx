import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Arrows } from '../images/arrows.svg';

import ImageContainer from '../components/ImageContainer';

import { newGame } from '../api_calls';
import './GameInit.css';

function GameInit() {
  const [actors, setActors] = useState([null, null]);

  useEffect(() => {
    const createNewGame = async () => {
      const newGameResponse = await newGame();
      setActors(newGameResponse);
    };

    createNewGame();
    console.log('Actors from GameInit:', actors);
  }, []);

  return (
    <>
      {actors[0] ? (
        <div className='start-container'>
          {/* -------------------Top logo---------------------------- */}
          <Logo className='large-logo' />
          {/* -------------------Middle section---------------------- */}
          <div className='flex-row start-middle-section'>
            <ImageContainer item={actors[0]} size={'large'} position={'left'} />

            <div className='arrows'>
              <Arrows />
            </div>

            <ImageContainer
              item={actors[1]}
              size={'large'}
              position={'right'}
            />
          </div>
          {/* -------------------Bottom buttons---------------------- */}
          <div className='flex-row'>
            <Link to='/game' state={actors}>
              <button className='button large-button'>START GAME</button>
            </Link>
            <Link to='/'>
              <button className='button small-button large-text'> &lt;</button>
            </Link>
          </div>
          {/* ------------------------------------------------------- */}
        </div>
      ) : (
        <></> /* if we have no actors, load this  */
      )}
    </>
  );
}
export default GameInit;
