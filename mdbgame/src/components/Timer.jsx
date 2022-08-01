import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer({ timer, setTimer }) {
  const useTimer = () => {
    const timerDate = Date.now();
    const [initTime, setInitTimer] = useState(timerDate);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(Math.round((Date.now() - initTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }, [timerDate]);

    if (timer > 3599) {
      return new Date(timer * 1000).toISOString().slice(-13, -5);
    }
    return new Date(timer * 1000).toISOString().slice(-10, -5);
  };
  return (
    <div className='timer-container'>
      <p className='blue-text timer-text bold large-text'>Timer</p>
      <div className='timer'>
        <p className='timer-text  bold large-text'>{useTimer()}</p>
      </div>
    </div>
  );
}
export default Timer;
