const image500 = 'https://image.tmdb.org/t/p/w500';

const randActorPicker = (data) => {
  const randomActor = Math.floor(Math.random() * 21);
  return data[randomActor];
};

export const newGame = async () => {
  const randomPage = Math.floor(Math.random() * 11);

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPage}`
  );
  const data = await response.json();

  // Randomly select two actors from the API response
  const actorPair = [randActorPicker(data), randActorPicker(data)];

  // Ensure that the two actors don't have the adult flag set to true
  while (actorPair[0].adult) {
    actorPair[0] = randActorPicker(data);
  }
  while (actorPair[1].adult) {
    actorPair[1] = randActorPicker(data);
  }

  // If the two actors are the same, select a new one
  if (actorPair[0].id === actorPair[1].id) {
    actorPair[1] = randActorPicker(data);
  }

  //providing the actual image path
  actorPair[0].image = actorPair[1].profile_path
    ? image500 + actorPair[1].profile_path
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

  data.profile_path = data.profile_path ? image500 + data.profile_path : null;

  return data;
};
