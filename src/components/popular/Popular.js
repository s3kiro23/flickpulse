import { getMovieByPath } from "@/utils/movieClient";
import React from "react";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./Popular.module.scss";
import { getDictionary } from "@/utils/dictionaries";

const Popular = async ({ locale }) => {
  const i18n = await getDictionary(locale);
  const { results } = await getMovieByPath("/movie/popular", [], locale);
  const { genres } = await getMovieByPath("/genre/movie/list", [], locale);

  const popularMovies = results.slice(0, 6);
  return (
    <div className={styles.popular}>
      <h2>{i18n.popular.title}</h2>
      <div className={styles.container}>
        {popularMovies.map(
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
              />
            )
          ),
        )}
      </div>
    </div>
  );
};

export default Popular;
