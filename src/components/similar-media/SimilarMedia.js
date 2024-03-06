import { getMediaByPath } from "@/utils/mediaClient";
import React from "react";
import styles from "./SimilarMedia.module.scss";
import MediaCard from "../media-card/MediaCard";

const SimilarMedia = async ({ movieId, locale, type }) => {
  const { results } = await getMediaByPath(
    `/${type}/${movieId}/similar`,
    [],
    locale,
  );
  const { genres } = await getMediaByPath(`/genre/${type}/list`, [], locale);

  return (
    <div className={styles.similar}>
      <div className={styles.list}>
        {results
          .slice(0, 6)
          .map(
            (movie) => (
              (movie.genre_ids = genres
                .filter((genre) => movie.genre_ids.includes(genre.id))
                .map((genre) => genre.name)),
              (
                <MediaCard
                  media={movie}
                  key={movie.id}
                  genres={movie.genre_ids}
                  locale={locale}
                  type={type}
                />
              )
            ),
          )}
      </div>
    </div>
  );
};

export default SimilarMedia;
