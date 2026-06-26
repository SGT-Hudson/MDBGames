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
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch the target actor's details (birth/death year, country).
  useEffect(() => {
    let active = true;
    getActorInfo(actor.id).then((data) => {
      if (active) setInfo(data);
    });
    return () => {
      active = false;
    };
  }, [actor.id]);

  const meta = info ? itemMeta(info).slice(0, 2) : [];

  return (
    <>
      <div className='flex-column sidebar'>
        <Logo className='small-logo sidebar-logo' />
        <div className='sidebar-target'>
          <button
            className='target-photo-btn'
            onClick={() => setModalOpen(true)}
            aria-label='View target actor'
          >
            <ImageContainer item={actor} size={'small'} />
          </button>
          <div className='target-info'>
            <p className='sidebar-text'>Find this actor</p>
            <h2 className='target-name'>{actor.name}</h2>
            {meta.length ? (
              <p className='target-meta'>{meta.join(' · ')}</p>
            ) : null}
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

      {modalOpen ? (
        <div className='modal-backdrop' onClick={() => setModalOpen(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button
              className='modal-close'
              onClick={() => setModalOpen(false)}
              aria-label='Close'
            >
              ×
            </button>
            {actor.image ? (
              <img
                className='modal-image'
                src={actor.image}
                alt={actor.name}
              />
            ) : null}
            <h2 className='modal-name'>{actor.name}</h2>
            {meta.length ? (
              <p className='modal-meta'>{meta.join(' · ')}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
