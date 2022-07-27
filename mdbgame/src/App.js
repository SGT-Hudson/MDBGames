import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Game from './Pages/Game';
import GameInit from './Pages/GameInit';
import Menu from './Pages/Menu';
import PostGame from './Pages/PostGame';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/'>
            <Menu />
          </Route>
          <Route path='/newgame'>
            <GameInit />
          </Route>
          <Route path='/game'>
            <Game />
          </Route>
          <Route path='/postgame'>
            <PostGame />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
