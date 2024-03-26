import styles from "./MoviesSearchResults.module.scss";
import MediaCard from "@/components/media-card/MediaCard";
import { getMediaByPath } from "@/utils/mediaClient";

const SearchResults = async ({ searchParams, genreId, locale }) => {
  const { results } = await getMediaByPath(
    "/discover/movie",
    [
      { key: "sort_by", value: searchParams.sort_by },
      { key: "release_date.gte", value: searchParams["release_date.gte"] },
      { key: "release_date.lte", value: searchParams["release_date.lte"] },
      { key: "with_genres", value: genreId },
    ],
    locale,
  );
  const { genres } = await getMediaByPath("/genre/movie/list", [], locale);

  return (
    <div className={styles.results}>
      {results
        .filter((movie) => movie.poster_path)
        .map(
          (movie) => (
            (movie.genre_ids = genres
              .filter((genre) => movie.genre_ids.includes(genre.id))
              .map((genre) => genre.name)),
            (
              <MediaCard
                key={movie.id}
                media={movie}
                genres={movie.genre_ids}
                locale={locale}
                type="movie"
              />
            )
          ),
        )}
    </div>
  );
};

export default SearchResults;
