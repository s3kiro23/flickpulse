import React, { Suspense } from "react";
import MediaCredits from "../../media-credits/MediaCredits";
import styles from "./MovieContent.module.scss";

const MovieContent = ({ media, locale, type }) => {
  return (
    <div className={styles.description}>
      <h1>
        {media.title}{" "}
        <span className={styles.release}>
          ({new Date(media.release_date).toLocaleDateString(locale)})
        </span>
      </h1>
      <p className={styles.production}>
        Production :{" "}
        <span>
          {media.production_companies.map((company) => company.name).join(", ")}
        </span>
      </p>
      <h2>Synopsis</h2>
      <p className={styles.overview}>{media.overview}</p>
      <div className={styles.credits}>
        <Suspense fallback={<p>Chargement ...</p>}>
          <MediaCredits mediaId={media.id} type={type} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieContent;
