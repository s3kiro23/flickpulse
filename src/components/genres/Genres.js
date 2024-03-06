import { getMediaByPath } from "@/utils/mediaClient";
import React from "react";
import Link from "next/link";
import styles from "./Genres.module.scss";
import { getDictionary } from "@/utils/dictionaries";

const Genres = async ({ locale, type }) => {
  const { genres } = await getMediaByPath(`/genre/${type}/list`, [], locale);
  const i18n = await getDictionary(locale);
  let linkType = "movie";
  if (type === "tv") linkType = "serie";
  return (
    <div>
      {type === "tv" ? <h2>{i18n.genre.tv}</h2> : <h2>{i18n.genre.movie}</h2>}
      <div className={styles.container}>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/${locale}/${linkType}s/genres/${genre.id}`}
            className={styles.genre}
          >
            <p>{genre.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Genres;
