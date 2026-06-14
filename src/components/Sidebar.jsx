import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import ImageContainer from '../components/ImageContainer';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { getActorInfo } from '../api_calls';
import { itemMeta } from '../meta';

function Sidebar({ actor, end }) {
  const [timer, setTimer] = useState(0);
  const [info, setInfo] = useState(null);

  // Fetch the target actor's details (age, nationality, ...).
  useEffect(() => {
    let active = true;
    getActorInfo(actor.id).then((data) => {
      if (active) setInfo(data);
    });
    return () => {
      active = false;
    };
  }, [actor.id]);

  // Keep the bar concise: just age and nationality.
  const meta = info ? itemMeta(info).slice(0, 2) : [];

  return (
    <div className='flex-column sidebar'>
      <Logo className='small-logo sidebar-logo' />
      <div className='sidebar-target'>
        <ImageContainer item={actor} size={'small'} />
        <div className='target-info'>
          <p className='sidebar-text'>Find this actor</p>
          <h2 className='target-name'>{actor.name}</h2>
          {meta.length ? <p className='target-meta'>{meta.join(' · ')}</p> : null}
        </div>
      </div>
      <div className='sidebar-controls'>
        <Timer timer={timer} setTimer={setTimer} />

        <Link
          to='/endscreen'
          state={[actor, end, null, timer]}
          style={{ textDecoration: 'none' }}
          className='give-up-link'
        >
          <div className='give-up'>
            <p>Give Up</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
