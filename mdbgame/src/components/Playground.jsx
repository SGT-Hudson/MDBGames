import React from 'react';
import { useState } from 'react';
import PortraitContainer from './ImageContainer';
import './Playground.css';

function Playground({ actor }) {
  const [currentItem, setCurrentItem] = useState(actor)
  return <div className='playground-container'>
    <div className='flex-row'>
      <PortraitContainer
    
  </div>;
}

export default Playground;
