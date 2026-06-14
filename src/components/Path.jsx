import './Path.css';

function Path({ path, time, clicks, best, userName }) {
  if (!path || path.length === 0) return null;

  const pathString = path.join(' > ');

  return (
    <div className='path-card large-shadow'>
      <div className='path-card-header'>
        <h2>{best ? `Best path${userName ? `: ${userName}` : ''}` : 'Your path'}</h2>
        <div className='path-stats'>
          {time ? <span>{time}</span> : null}
          {clicks != null ? <span>{clicks} clicks</span> : null}
        </div>
      </div>
      <p className='path-chain'>{pathString}</p>
    </div>
  );
}

export default Path;
