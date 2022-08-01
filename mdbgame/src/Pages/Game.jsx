import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Playground from '../components/Playground';

import './Game.css';

function Game() {
  const location = useLocation();
  const actors = location.state;

  console.log('Actors from Location: ', actors);
  return (
    <div className='flex-row game-container'>
      <Sidebar actor={actors[1]} />
      <Playground value={actors[0]} end={actors[1]} />
    </div>
  );
}

export default Game;
