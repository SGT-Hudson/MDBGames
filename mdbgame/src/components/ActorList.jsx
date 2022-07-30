import React from 'react';
import './ActorList.css';
import Top5Item from './Top5Item';

function ActorList({ actors, setNewValue }) {
  return (
    <>
      {actors.map((actor) => {
        return (
          <Top5Item key={actor.id} actor={actor} setNewValue={setNewValue} />
        );
      })}
    </>
  );
}

export default ActorList;
