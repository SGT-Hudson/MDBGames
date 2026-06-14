// Helpers to format the short "years · country" metadata shown for actors,
// and "year · runtime · genre" for movies/TV.

// place_of_birth looks like "Los Angeles, California, USA" -> "USA".
export const getCountry = (placeOfBirth) =>
  placeOfBirth ? placeOfBirth.split(',').pop().trim() : null;

// Build a short list of metadata strings for any item (actor / movie / tv).
export const itemMeta = (item) => {
  if (!item) return [];
  const lines = [];

  if (item.type === 'actor') {
    if (item.birthday) {
      const birthYear = `${item.birthday}`.slice(0, 4);
      lines.push(
        item.deathday
          ? `${birthYear} – ${`${item.deathday}`.slice(0, 4)}`
          : birthYear
      );
    }
    const country = getCountry(item.place_of_birth);
    if (country) lines.push(country);
    return lines;
  }

  // movie or tv
  const year = item.release_date || item.first_air_date;
  if (year) lines.push(`${year}`.slice(0, 4));
  if (item.runtime) {
    const h = Math.floor(item.runtime / 60);
    const m = item.runtime % 60;
    lines.push(h ? `${h}h ${m}m` : `${m}m`);
  }
  if (item.number_of_seasons) {
    lines.push(
      `${item.number_of_seasons} season${item.number_of_seasons > 1 ? 's' : ''}`
    );
  }
  if (item.genres && item.genres[0]) lines.push(item.genres[0].name);
  return lines;
};

