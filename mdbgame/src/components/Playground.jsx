import React, { useState, useEffect } from 'react';
import { getActorAPI, getMovieAPI, getTvAPI } from '../api_calls';
import ImageContainer from './ImageContainer';
import TopInfo from './TopInfo';
import './Playground.css';
import MovieList from './MovieList';
import Top5Item from './Top5Item';
import { useNavigate } from 'react-router-dom';

function Playground({ value, end }) {
  const [ready, setReady] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [newValue, setNewValue] = useState(['actor', value.id, value.name]);
  const [path, setPath] = useState([]);
  const [time, setTime] = useState(new Date().getTime());

  const navigate = useNavigate();

  const getNewData = async () => {
    setReady(false);
    const type = newValue[0];
    const id = newValue[1];

    if (type === 'actor') {
      const actorData = await getActorAPI(id);
      setCurrentItem(actorData);
    } else if (type === 'movie') {
      const movieData = await getMovieAPI(id);
      setCurrentItem(movieData);
    } else if (type === 'tv') {
      const tvData = await getTvAPI(id);

      setCurrentItem(tvData);
    }
    setReady(true);
  };

  useEffect(() => {
    const type = newValue[0];
    const id = newValue[1];
    const name = newValue[2];
    const getData = async () => {
      await getNewData();
    };

    console.log('newValue:', newValue);
    setPath([...path, name]);
    console.log('Path: ', path);

    if (type === 'actor' && id === 527313) {
      console.log('End screen!!!');
      navigate('/endscreen', {
        state: [value, end, [...path, end.name], time],
      });
    } else getData();
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
          {currentItem.type === 'actor' && ready ? (
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
                      item={actor}
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
