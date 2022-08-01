import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Game from './Pages/Game';
import GameInit from './Pages/GameInit';
import Menu from './Pages/Menu';
import PostGame from './Pages/PostGame';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Menu />} />
        <Route path='/newgame' element={<GameInit />} />
        <Route path='/game' element={<Game />} />
        <Route path='/endscreen' element={<PostGame />} />
      </Routes>
    </>
  );
}

export default App;
