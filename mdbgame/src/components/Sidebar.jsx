import React from 'react';
import Timer from '../components/Timer';
import ImageContainer from '../components/ImageContainer';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Sidebar.css';

function Sidebar({ actor }) {
  return (
    <div className='flex-column sidebar'>
      <div className='flex-column'>
        <Logo className='small-logo' />
        <ImageContainer actor={actor} size={'small'} />
      </div>
      <Timer />
    </div>
  );
}

export default Sidebar;
