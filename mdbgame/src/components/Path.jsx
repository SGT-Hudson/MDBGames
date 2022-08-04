import './Path.css';

function Path({ path, time, best, userName }) {
  let pathString;
  if (path) {
    pathString = path.join(' > ');
  }

  if (path === null) {
    return (
      <div className='end-middle-section-text large-shadow'>
        <div className='flex-column top-text'>
          <h1>YOU GAVE UP</h1>
          <h1>Time wasted: {time}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className='end-middle-section-text large-shadow'>
      <div className='flex-row top-text'>
        {best ? <h2>Best path: {userName}</h2> : <h2>Your path</h2>}
        {time ? <h2>Time: {time}</h2> : <></>}
      </div>
      {path ? <p className='path'>{pathString}</p> : <></>}
    </div>
  );
}

export default Path;
