const image500 = 'https://image.tmdb.org/t/p/w500';
const maxPage = 10;

const randActorPicker = (data) => {
  const randomActor = Math.floor(Math.random() * 21);
  return data[randomActor];
};

export const newGame = async () => {
  const randomPage = Math.floor(Math.random() * maxPage + 1);

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
  );
  const data = await response.json();

  const actorList = data.results;
  // Randomly select two actors from the API response
  const actorPair = [{}, {}];
  actorPair[0] = randActorPicker(actorList);
  actorPair[1] = randActorPicker(actorList);

  // Ensure that the two actors don't have the adult flag set to true
  while (actorPair[0].adult === true) {
    actorPair[0] = randActorPicker(actorList);
  }
  while (actorPair[1].adult === true) {
    actorPair[1] = randActorPicker(actorList);
  }

  // If the two actors are the same, select a new one
  if (actorPair[0].id === actorPair[1].id) {
    actorPair[1] = randActorPicker(actorList);
  }

  //providing the actual image path
  actorPair[0].image = actorPair[0].profile_path
    ? image500 + actorPair[0].profile_path
    : null;

  actorPair[1].image = actorPair[1].profile_path
    ? image500 + actorPair[1].profile_path
    : null;

  return actorPair;
};

export const getActor = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits`
  );
  const data = await response.json();

  data.image = data.profile_path ? image500 + data.profile_path : null;
  data.combined_credits.cast.forEach((production) => {
    if (production.media_type === 'tv') {
      production.release_date = production.first_air_date.substring(0, 4);
      production.title = production.name;
    } else {
      production.release_date = production.release_date.substring(0, 4);
    }
    if (production.poster_path)
      production.image = image500 + production.poster_path;
    else if (production.backdrop_path)
      production.image = image500 + production.backdrop_path;
    else production.image = null;
  });
  data.combined_credits.cast.sort((a, b) => {
    return a.release_date >= b.release_date ? -1 : 1;
  });

  return data;
};

export const getMovie = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  const data = await response.json();

  data.poster_path = data.poster_path ? image500 + data.poster_path : null;

  return data;
};
