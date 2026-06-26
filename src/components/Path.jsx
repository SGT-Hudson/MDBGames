import './Path.css';

function Path({ path, time, clicks, best, userName, highlight, markRepeats }) {
  if (!path || path.length === 0) return null;

  // Nodes the player visited more than once (only meaningful for their path).
  let repeated = null;
  if (markRepeats) {
    const counts = {};
    path.forEach((node) => {
      counts[node] = (counts[node] || 0) + 1;
    });
    repeated = new Set(path.filter((node) => counts[node] > 1));
  }

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
          // A repeated node takes precedence over the shared-node highlight.
          const isRepeated = repeated ? repeated.has(node) : false;
          const isCommon = !isRepeated && highlight ? highlight.has(node) : false;
          const className = isRepeated
            ? 'path-node repeated'
            : isCommon
            ? 'path-node common'
            : 'path-node';
          return (
            <span className='path-step' key={`${node}-${i}`}>
              {i > 0 ? <span className='path-arrow'>›</span> : null}
              <span className={className}>{node}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Path;
