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
  const rasistSearch = actorPair.find((actor) => actor.adult === true);
  console.log(actorPair);
  while (
    actorPair[0].adult === true ||
    actorPair[0].known_for[0].original_language === 'ko' ||
    actorPair[0].known_for[0].original_language === 'ja' ||
    actorPair[0].known_for[0].original_language === 'th' ||
    actorPair[0].known_for[0].original_language === 'zh'
  ) {
    actorPair[0] = randActorPicker(actorList);
  }
  while (
    actorPair[1].adult === true ||
    actorPair[1].known_for[0].original_language === 'ko' ||
    actorPair[1].known_for[0].original_language === 'ja' ||
    actorPair[1].known_for[0].original_language === 'th' ||
    actorPair[1].known_for[0].original_language === 'zh' ||
    actorPair[0].id === actorPair[1].id
  ) {
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
  // GETTING THE DATA FROM THE API
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits`
  );
  const data = await response.json();

  // PROVIDING THE ACTUAL IMAGE PATH
  data.image = data.profile_path ? image500 + data.profile_path : null;

  // MODIFYING THE ACTOR'S MOVIES
  data.combined_credits.cast.forEach((production) => {
    if (production.media_type === 'tv') {
      production.release_date = production.first_air_date.substring(0, 4);
      production.title = production.name;
    } else production.release_date = production.release_date.substring(0, 4);

    if (production.poster_path)
      production.image = image500 + production.poster_path;
    else if (production.backdrop_path)
      production.image = image500 + production.backdrop_path;
    else production.image = null;

    production.name = production.title;
  });

  // SORTING THE PRODUCTIONS BY RELEASE DATE
  data.combined_credits.cast.sort((a, b) => {
    return parseInt(a.release_date) >= parseInt(b.release_date) ? -1 : 1;
  });

  // DELETING THE MOVIES THAT HAVE NO RELEASE DATE
  data.cast = data.combined_credits.cast.filter((production) => {
    return production.release_date !== '' && production.adult === false;
  });

  // GETTING THE TOP 4 MOVIES
  data.top5 = data.combined_credits.cast
    .sort((a, b) => {
      return a.vote_count >= b.vote_count ? -1 : 1;
    })
    .slice(0, 5);

  // DELETING THE OLD UNSORTED PRODUCTION LIST
  delete data.combined_credits;

  console.log('Actor API call: ', data);
  return data;
};

export const getMovie = async (id) => {
  // GETTING THE DATA FROM THE API
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`
  );
  const data = await response.json();

  // PROVIDING THE ACTUAL IMAGE PATH
  data.poster_path = data.poster_path ? image500 + data.poster_path : null;

  console.log('Movie API call: ', data);
  return data;

  // MODIFYING THE ACTOR'S MOVIES
  data.combined_credits.cast.forEach((production) => {
    if (production.media_type === 'tv') {
      production.release_date = production.first_air_date.substring(0, 4);
      production.title = production.name;
    } else production.release_date = production.release_date.substring(0, 4);

    if (production.poster_path)
      production.image = image500 + production.poster_path;
    else if (production.backdrop_path)
      production.image = image500 + production.backdrop_path;
    else production.image = null;

    production.name = production.title;
  });

  // SORTING THE PRODUCTIONS BY RELEASE DATE
  data.combined_credits.cast.sort((a, b) => {
    return parseInt(a.release_date) >= parseInt(b.release_date) ? -1 : 1;
  });

  // DELETING THE MOVIES THAT HAVE NO RELEASE DATE
  data.cast = data.combined_credits.cast.filter((production) => {
    return production.release_date !== '' && production.adult === false;
  });

  // GETTING THE TOP 4 MOVIES
  data.top5 = data.combined_credits.cast
    .sort((a, b) => {
      return a.vote_count >= b.vote_count ? -1 : 1;
    })
    .slice(0, 5);

  // DELETING THE OLD UNSORTED PRODUCTION LIST
  delete data.combined_credits;

  console.log('Actor API call: ', data);
  return data;
};
