import React, { useEffect } from 'react';
import { useState } from 'react';
import { getActor, getMovie } from '../api_calls';
import ImageContainer from './ImageContainer';
import TopInfo from './TopInfo';
import './Playground.css';
import MovieList from './MovieList';
import ActorList from './ActorList';
import Top5Item from './Top5Item';

function Playground({ actor }) {
  const [currentItem, setCurrentItem] = useState({});
  const [ready, setReady] = useState(false);
  const [newValue, setNewValue] = useState(['actor', actor]);

  const getActorData = async (id) => {
    const actorData = await getActor(id);
    console.log('Actor data:', actorData);
    setCurrentItem(actorData);
    setReady(true);
  };
  const getMovieData = async (id) => {
    const movieData = await getMovie(id);
    console.log('Movie data:', movieData);
    setCurrentItem(movieData);
    setReady(true);
  };

  useEffect(() => {
    getActorData(actor.id);
  }, []);

  useEffect(() => {
    console.log('newValue:', newValue);
    if (newValue[0] === 'actor' && ready === true) {
      setReady(false);
      getActorData(newValue[1]);
    } else if (newValue[0] === 'movie' && ready === true) {
      setReady(false);
      getMovieData(newValue[1]);
    }
  }, [newValue]);

  return (
    <>
      {ready ? (
        <div className='playground-container'>
          <div className='flex-row'>
            <ImageContainer
              item={currentItem}
              size={'large'}
              shadow={'small'}
            />

            <TopInfo top5={currentItem.top5} setNewValue={setNewValue} />
          </div>
          {currentItem.gender ? (
            <div>
              <h1 className='movie-list-title'>Starred in:</h1>
              <MovieList credits={currentItem.cast} setNewValue={setNewValue} />
            </div>
          ) : (
            <div>
              <h1 className='movie-list-title'>Cast:</h1>
              <div className='flex-row actor-list'>
                {currentItem.cast.map((actor) => {
                  return (
                    <Top5Item
                      key={actor.id}
                      actor={actor}
                      setNewValue={setNewValue}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Playground;
