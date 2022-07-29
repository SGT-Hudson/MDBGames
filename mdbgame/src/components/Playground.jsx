import React, { useEffect } from 'react';
import { useState } from 'react';
import { getActor } from '../api_calls';
import ImageContainer from './ImageContainer';
import TopInfo from './TopInfo';
import './Playground.css';
import MovieList from './MovieList';

function Playground({ actor }) {
  const [currentItem, setCurrentItem] = useState({
    ...actor,
    combined_credits: { cast: [] },
  });

  useEffect(() => {
    const getActorData = async () => {
      const actorData = await getActor(actor.id);
      setCurrentItem(actorData);
      console.log('Current playing actor:', currentItem);
    };
    getActorData();
  }, []);
  return (
    <div className='playground-container'>
      <div className='flex-row'>
        <ImageContainer actor={currentItem} size={'large-playground'} />
        <TopInfo
          birthday={currentItem.birthday}
          deathday={currentItem.deathday}
          nationality={currentItem.nationality}
          credits={currentItem.combined_credits.cast}
        />
      </div>
      <h1 className='movie-list-title'>Performed in:</h1>
      <MovieList
        className='movie-list-container'
        credits={currentItem.combined_credits.cast}
      />
    </div>
  );
}

export default Playground;
