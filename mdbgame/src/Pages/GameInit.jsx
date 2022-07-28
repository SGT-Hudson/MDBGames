import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PortraitContainer from '../components/ImageContainer';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import './GameInit.css';
import { newGame } from '../api_calls';

function GameInit() {
  const [actors, setActors] = useState([null, null]);

  useEffect(() => {
    const createNewGame = async () => {
      const newGameResponse = await newGame();
      console.log(newGameResponse);
      setActors(newGameResponse);
    };

    createNewGame();
    console.log(actors);
  }, []);

  return (
    <div className='start-container'>
      <Logo className='large-logo' />
      <div className='flex-row start-middle-section'>
        <PortraitContainer actor={actors[0]} size={'large'} />

        <div className='flex-row'>
          <Arrow className='arrow' />
          <Arrow className='arrow' />
          <Arrow className='arrow' />
          <Arrow className='arrow' />
          <Arrow className='arrow' />
        </div>

        <PortraitContainer actor={actors[1]} size={'large'} />
      </div>
      <div className='flex-row'>
        <Link to='/game' state={actors}>
          <button className='large-button'>START GAME</button>
        </Link>
        <Link to='/'>
          <button className='small-button large-text'> &lt;</button>
        </Link>
        {/* here goes the whole menu */}
      </div>
    </div>
  );
}
export default GameInit;
