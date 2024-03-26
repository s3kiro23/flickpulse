import React from "react";
import styles from "./MediaDetails.module.scss";
import Image from "next/image";
import SerieContent from "./serie-content/SerieContent";
import MovieContent from "./movie-content/MovieContent";

const MediaDetails = async ({ media, locale, type }) => {
  return (
    <div className={styles.details}>
      <div className={styles.background}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original${media.backdrop_path}`}
          fill
          alt={type === "tv" ? media.original_name : media.title}
        />
      </div>
      <div className={styles.content}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w342${media.poster_path}`}
          width={250}
          height={400}
          alt={type === "tv" ? media.original_name : media.title}
        />
        {type === "tv" ? (
          <SerieContent media={media} locale={locale} type={type} />
        ) : (
          <MovieContent media={media} locale={locale} type={type} />
        )}
      </div>
    </div>
  );
};

export default MediaDetails;
