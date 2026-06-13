import Top5Item from './Top5Item';
import './MovieList.css';

function MovieList({ credits, setNewValue }) {
  return (
    <div className='card-grid'>
      {credits.map((production) => (
        <Top5Item
          key={production.id + ' ' + production.character}
          item={production}
          setNewValue={setNewValue}
        />
      ))}
    </div>
  );
}

export default MovieList;
