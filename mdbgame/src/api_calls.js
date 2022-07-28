const image500 = 'https://image.tmdb.org/t/p/w500';

export const newGame = async () => {
  const randomPage = Math.floor(Math.random() * 11);

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
  );
  const data = await response.json();

  // Randomly select two actors from the API response
  const actorPair = [{}, {}];
  const randomActor1 = Math.floor(Math.random() * data.results.length);
  let randomActor2 = Math.floor(Math.random() * data.results.length);

  // If the two actors are the same, select a new one
  if (randomActor1 === randomActor2) {
    randomActor2 = Math.floor(Math.random() * data.results.length);
  }

  //only selecting data that is usefull for the game ---------------------------------
  actorPair[0].id = data.results[randomActor1].id;
  actorPair[0].name = data.results[randomActor1].name;
  actorPair[0].image = image500 + data.results[randomActor1].profile_path;
  actorPair[0].known_for = [{}, {}, {}];
  for (let i = 0; i < data.results[randomActor1].known_for.length; i++) {
    actorPair[0].known_for[i].title =
      data.results[randomActor1].known_for[i].title;
    actorPair[0].known_for[i].poster_path =
      image500 + data.results[randomActor1].known_for[i].poster_path;
  }

  actorPair[1].id = data.results[randomActor2].id;
  actorPair[1].name = data.results[randomActor2].name;
  actorPair[1].image = image500 + data.results[randomActor2].profile_path;
  actorPair[1].known_for = [{}, {}, {}];
  for (let i = 0; i < data.results[randomActor2].known_for.length; i++) {
    actorPair[1].known_for[i].title =
      data.results[randomActor2].known_for[i].title;
    actorPair[1].known_for[i].poster_path =
      image500 + data.results[randomActor2].known_for[i].poster_path;
  }
  //---------------------------------------------------------------------------------

  return actorPair;
};
