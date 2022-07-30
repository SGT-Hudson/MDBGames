import './MovieList.css';

function MovieList({ credits }) {
  // console.log('Credits of current actor:', credits);
  const handleClick = function (production) {
    console.log('Movie clicked:', production);
  };

  return (
    <>
      {credits.map((production) => {
        return (
          <button
            className='movie-container'
            key={production.id + ' ' + production.character}
            onClick={() => handleClick(production)}
          >
            {production.character === '' ? (
              <p>
                {production.release_date}
                {' --- '}
                <span className='bold'>{production.title}</span>
              </p>
            ) : (
              <p>
                {production.release_date}
                {' --- '}
                <span className='bold'>{production.title}</span>
                <span className='grey-text'> as </span>
                {`${production.character}`}
              </p>
            )}
          </button>
        );
      })}
    </>
  );
}

export default MovieList;
