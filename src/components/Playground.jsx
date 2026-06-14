import React, { useState, useEffect } from 'react';
import { getActorAPI, getMovieAPI, getTvAPI } from '../api_calls';
import ImageContainer from './ImageContainer';
import './Playground.css';
import MovieList from './MovieList';
import Top5Item from './Top5Item';
import { itemMeta } from '../meta';
import { useNavigate } from 'react-router-dom';

function Playground({ value, end }) {
  const [ready, setReady] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [newValue, setNewValue] = useState(['actor', value.id, value.name]);
  const [path, setPath] = useState([]);
  const [time] = useState(new Date().getTime());

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

    setPath([...path, name]);

    if (type === 'actor' && id === end.id) {
      const timeInSec = Math.round((Date.now() - time) / 1000);

      navigate('/endscreen', {
        replace: true,
        state: [value, end, [...path, end.name], timeInSec],
      });
    } else getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue]);

  return (
    <>
      {ready ? (
        <div className='playground-container'>
          <div className='current-card'>
            <div className='current-top'>
              <ImageContainer
                item={currentItem}
                size={'large'}
                shadow={'small'}
              />

              <div className='current-info'>
                <h2 className='current-title'>{currentItem.name}</h2>
                <div className='current-meta'>
                  {itemMeta(currentItem).map((m, i) => (
                    <span className='meta-pill' key={i}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='known-for'>
              <p className='known-for-label'>
                {currentItem.top5[0].type === 'actor'
                  ? 'Top actors'
                  : 'Known for'}
              </p>
              <div className='known-for-row'>
                {currentItem.top5.slice(0, 4).map((item) => (
                  <Top5Item
                    key={item.id}
                    item={item}
                    setNewValue={setNewValue}
                  />
                ))}
              </div>
            </div>
          </div>
          {currentItem.type === 'actor' && ready ? (
            <div>
              <h1 className='movie-list-title'>Starred in:</h1>
              <MovieList credits={currentItem.cast} setNewValue={setNewValue} />
            </div>
          ) : (
            <div>
              <h1 className='movie-list-title'>Cast:</h1>
              <div className='card-grid'>
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
