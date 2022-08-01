import React, { useContext, useState } from 'react';
import Timer from '../components/Timer';
import ImageContainer from '../components/ImageContainer';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ actor, end }) {
  const [timer, setTimer] = useState(0);

  return (
    <div className='flex-column sidebar'>
      <div className='flex-column'>
        <Logo className='small-logo' />
        <h1 className='bold sidebar-text'>Find this actor</h1>
        <ImageContainer item={actor} size={'small'} />
      </div>
      <div className='flex-column'>
        <Timer timer={timer} setTimer={setTimer} />

        <Link
          to='/endscreen'
          state={[actor, end, null, timer]}
          style={{ textDecoration: 'none' }}
        >
          <div className='give-up large-shadow'>
            <p>Give Up</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
