import "server-only";

export const getMovieByPath = (path, params = [], language = "fr-FR") => {
  const url = new URL(`${process.env.TMDB_API_URL}${path}`);
  url.searchParams.append("api_key", process.env.TMDB_API_KEY);
  url.searchParams.append("language", language);
  params
    .filter((param) => param.value)
    .forEach((param) => {
      url.searchParams.append(param.key, param.value);
    });

  return fetch(url).then((res) => res.json());
};

export const getHydratedMovies = async (movieIds, language = "fr-FR") => {
  const moviePromises = movieIds.map((id) =>
    getMovieByPath(`/movie/${id}`, [], language),
  );

  const movies = await Promise.all(moviePromises);

  return movies;
};
