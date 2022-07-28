import React, { useEffect } from 'react';
import { useState } from 'react';
import { getActor } from '../api_calls';
import ImageContainer from './ImageContainer';
import './Playground.css';

function Playground({ actor }) {
  const [currentItem, setCurrentItem] = useState(actor);

  useEffect(() => {
    getActor(actor.id).then(setCurrentItem);
  }, []);
  return (
    <div className='playground-container'>
      <div className='flex-row'>
        <ImageContainer actor={actor} size={'large'} />
        <div className='playground-top-info'>
          <div className='playground-text'>
            <p>{/* Here goes the birthdate-death and nationality  */}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
