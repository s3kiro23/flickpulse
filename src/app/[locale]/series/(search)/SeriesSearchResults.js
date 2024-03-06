import styles from "./SeriesSearchResults.module.scss";
import MediaCard from "@/components/media-card/MediaCard";
import { getMediaByPath } from "@/utils/mediaClient";

const SearchResults = async ({ searchParams, genreId, locale }) => {
  const { results } = await getMediaByPath(
    "/discover/tv",
    [
      { key: "sort_by", value: searchParams.sort_by },
      { key: "release_date.gte", value: searchParams["release_date.gte"] },
      { key: "release_date.lte", value: searchParams["release_date.lte"] },
      { key: "with_genres", value: genreId },
    ],
    locale,
  );
  const { genres } = await getMediaByPath("/genre/tv/list", [], locale);

  return (
    <div className={styles.results}>
      {results
        .filter((serie) => serie.poster_path)
        .map(
          (serie) => (
            (serie.genre_ids = genres
              .filter((genre) => serie.genre_ids.includes(genre.id))
              .map((genre) => genre.name)),
            (
              <MediaCard
                key={serie.id}
                media={serie}
                genres={serie.genre_ids}
                locale={locale}
                type="serie"
              />
            )
          ),
        )}
    </div>
  );
};

export default SearchResults;
