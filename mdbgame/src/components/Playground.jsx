import React, { useEffect } from 'react';
import { useState } from 'react';
import { getActor } from '../api_calls';
import ImageContainer from './ImageContainer';
import TopInfo from './TopInfo';
import './Playground.css';
import MovieList from './MovieList';

function Playground({ actor }) {
  const [currentItem, setCurrentItem] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getActorData = async () => {
      const actorData = await getActor(actor.id);
      setCurrentItem(actorData);
      setReady(true);
    };
    getActorData();
  }, []);
  return (
    <div className='playground-background'>
      {ready ? (
        <div className='playground-container'>
          <div className='flex-row'>
            <ImageContainer
              item={currentItem}
              size={'large'}
              shadow={'small'}
            />

            <TopInfo top4={currentItem.top4} />
          </div>
          <h1 className='movie-list-title'>Starred in:</h1>
          <MovieList credits={currentItem.cast} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Playground;
