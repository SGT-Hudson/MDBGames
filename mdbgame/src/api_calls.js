const image500 = 'https://image.tmdb.org/t/p/w500';
const maxPage = 1;

const randActorPicker = (data) => {
  const randomActor = Math.floor(Math.random() * 21);
  return data[randomActor];
};

const checkAdultContent = (actor) => {
  if (actor.known_for) {
    for (let i = 0; i < actor.known_for.length; i++) {
      //there is a lot of adult content not tagged as adult from this coutries
      if (
        ['ko', 'ja', 'th', 'zh'].includes(
          actor.known_for[i].original_language
        ) ||
        actor.known_for[i].adult === true
      ) {
        console.log('hiiii', actor, i);
        return true;
      }
    }
  }
  return false;
};

export const newGame = async () => {
  const randomPage = Math.floor(Math.random() * maxPage + 1);

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
  );
  const data = await response.json();
  console.log(data);
  const actorList = data.results;
  // Randomly select two actors from the API response
  const actorPair = [{}, {}];

  // Ensure that the two actors don't have the adult flag set to true
  do {
    actorPair[0] = randActorPicker(actorList);
    console.log('0', actorPair[0]);
    actorPair[0].adultContent = checkAdultContent(actorPair[0]);
  } while (actorPair[0].adultContent === true);

  do {
    actorPair[1] = randActorPicker(actorList);
    console.log('1', actorPair[1]);
    actorPair[1].adultContent = checkAdultContent(actorPair[1]);
  } while (
    actorPair[1].adultContent === true ||
    actorPair[0].id === actorPair[1].id
  );

  console.log(actorPair);
  //providing the actual image path
  actorPair[0].image = actorPair[0].profile_path
    ? image500 + actorPair[0].profile_path
    : null;

  actorPair[1].image = actorPair[1].profile_path
    ? image500 + actorPair[1].profile_path
    : null;

  return actorPair;
};

export const getActorAPI = async (id) => {
  // GETTING THE DATA FROM THE API
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits`
  );
  const data = await response.json();

  // PROVIDING THE ACTUAL IMAGE PATH AND A TYPE OF CONTENT
  data.type = 'actor';
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
    production.type = production.media_type;
  });

  // SORTING THE PRODUCTIONS BY RELEASE DATE
  data.combined_credits.cast.sort((a, b) => {
    return parseInt(a.release_date) >= parseInt(b.release_date) ? -1 : 1;
  });

  // DELETING THE MOVIES THAT HAVE NO RELEASE DATE OR ARE ADULT CONTENT
  data.cast = data.combined_credits.cast.filter((production) => {
    return production.release_date !== '' && production.adult === false;
  });

  // GETTING THE TOP 4 MOVIES
  data.top5 = data.combined_credits.cast
    .sort((a, b) => {
      return a.vote_count >= b.vote_count ? -1 : 1;
    })
    .slice(0, 5);
  // DELETING THE OLD UNFILTERED PRODUCTION LIST
  delete data.combined_credits;

  console.log('Actor API call: ', data);
  return data;
};

export const getMovieAPI = async (id) => {
  // GETTING THE DATA FROM THE API

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`
  );
  const data = await response.json();

  // PROVIDING THE ACTUAL IMAGE PATH AND ADDING THE NAME VALUE TO THE MOVIE
  data.type = 'movie';
  if (data.poster_path) data.image = image500 + data.poster_path;
  else if (data.backdrop_path) data.image = image500 + data.backdrop_path;
  else data.image = null;

  data.name = data.title;

  // MODIFYING THE MOVIES'S ACTORS
  data.credits.cast.forEach((actor) => {
    if (actor.profile_path) actor.image = image500 + actor.profile_path;
    else actor.image = null;

    actor.type = 'actor';
  });

  // DELETING THE ACTORS THAT PERFORM IN ADULT CONTENT
  data.cast = data.credits.cast.filter((actor) => {
    return actor.adult === false;
  });

  // SPLITTING THE TOP 5 ACTORS
  data.top5 = data.credits.cast.splice(0, 5);
  data.cast = data.credits.cast;

  // DELETING THE OLD UNFILTERED CREDITS LIST
  delete data.credits;

  console.log('Movie API call: ', data);
  return data;
};

export const getTvAPI = async (id) => {
  // GETTING THE DATA FROM THE API
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=aggregate_credits`
  );
  const data = await response.json();

  // PROVIDING THE ACTUAL IMAGE PATH AND ADDING THE NAME VALUE TO THE MOVIE
  data.type = 'tv';
  if (data.poster_path) data.image = image500 + data.poster_path;
  else if (data.backdrop_path) data.image = image500 + data.backdrop_path;
  else data.image = null;

  // MODIFYING THE MOVIES'S ACTORS
  data.aggregate_credits.cast.forEach((actor) => {
    if (actor.profile_path) actor.image = image500 + actor.profile_path;
    else actor.image = null;

    actor.type = 'actor';
  });

  // DELETING THE ACTORS THAT PERFORM IN ADULT CONTENT
  data.aggregate_credits.cast.filter((actor) => {
    return actor.adult === false;
  });

  // GETTING THE TOP 5 ACTORS
  data.top5 = data.aggregate_credits.cast.splice(0, 5);
  data.cast = data.aggregate_credits.cast;

  // DELETING THE OLD UNFILTERED CREDITS LIST
  delete data.credits;

  console.log('TV API call: ', data);
  return data;
};
