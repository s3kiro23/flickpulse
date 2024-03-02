import React from "react";
import Image from "next/image";
import styles from "./MovieCredits.module.scss";
import { getMovieByPath } from "@/utils/movieClient";

const MovieCredits = async ({ movieId, locale }) => {
  const { cast } = await getMovieByPath(`/movie/${movieId}/credits`, [], locale);
  return (
    <div className={styles.credits}>
      {cast.slice(0, 4).map((person) => (
        <div key={person.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185${person.profile_path}`}
            alt={person.name}
            width={90}
            height={90}
          />
          <p>{person.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCredits;
