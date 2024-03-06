import { getMediaByPath } from "@/utils/mediaClient";
import React from "react";
import styles from "./SimilarMedia.module.scss";
import MediaCard from "../media-card/MediaCard";

const SimilarMedia = async ({ mediaId, locale, type }) => {
  const { results } = await getMediaByPath(
    `/${type}/${mediaId}/similar`,
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
            (media) => (
              (media.genre_ids = genres
                .filter((genre) => media.genre_ids.includes(genre.id))
                .map((genre) => genre.name)),
              (
                <MediaCard
                  media={media}
                  key={media.id}
                  genres={media.genre_ids}
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
