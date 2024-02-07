import { getMovieByPath } from "@/utils/movieClient";
import React from "react";
import MediaCard from "@/components/MediaCard/MediaCard";
import styles from "./Popular.module.scss";

const Popular = async () => {
  const { results } = await getMovieByPath("/movie/popular");
  const popularMovies = results.slice(0, 6);
  return (
    <div className={styles.popular}>
      <h2>Les plus populaires</h2>
      <div className={styles.container}>
        {popularMovies.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;