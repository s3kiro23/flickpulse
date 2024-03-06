import { getMediaByPath } from "@/utils/mediaClient";
import React from "react";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./Popular.module.scss";
import { getDictionary } from "@/utils/dictionaries";

const Popular = async ({ locale, type }) => {
  const i18n = await getDictionary(locale);
  const { results } = await getMediaByPath(`/${type}/popular`, [], locale);
  const { genres } = await getMediaByPath(`/genre/${type}/list`, [], locale);

  const popularMedia = results.slice(0, 6);
  return (
    <div className={styles.popular}>
      {type === "tv" ? <h2>{i18n.popular.tv}</h2> : <h2>{i18n.popular.movie}</h2>}
      <div className={styles.container}>
        {popularMedia.map(
          (media) => (
            (media.genre_ids = genres
              .filter((genre) => media.genre_ids.includes(genre.id))
              .map((genre) => genre.name)),
            (
              <MediaCard
                key={media.id}
                media={media}
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

export default Popular;
