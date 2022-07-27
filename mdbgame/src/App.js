import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import Game from './Pages/Game';
import GameInit from './Pages/GameInit';
import Menu from './Pages/Menu';
import PostGame from './Pages/PostGame';

function App() {
  return (
    <>
      <h1>Hi</h1>
      <Routes>
        <Route path='' element={<Menu />} />
        <Route path='/game' element={<Game />} />
        <Route path='/gameinit' element={<GameInit />} />
        <Route path='/postgame' element={<PostGame />} />
      </Routes>
    </>
  );
}

export default App;
