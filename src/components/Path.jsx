import './Path.css';

function Path({ path, time, clicks, best, userName, highlight }) {
  if (!path || path.length === 0) return null;

  return (
    <div className='path-card large-shadow'>
      <div className='path-card-header'>
        <h2>
          {best ? `Best path${userName ? `: ${userName}` : ''}` : 'Your path'}
        </h2>
        <div className='path-stats'>
          {time ? <span>{time}</span> : null}
          {clicks != null ? <span>{clicks} clicks</span> : null}
        </div>
      </div>
      <div className='path-chain'>
        {path.map((node, i) => {
          const common = highlight ? highlight.has(node) : false;
          return (
            <span className='path-step' key={`${node}-${i}`}>
              {i > 0 ? <span className='path-arrow'>›</span> : null}
              <span className={`path-node${common ? ' common' : ''}`}>
                {node}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Path;
