import React, { Suspense } from "react";
import MediaCredits from "../../media-credits/MediaCredits";
import styles from "./SerieContent.module.scss";

const SerieContent = ({ media, locale, type }) => {
  return (
    <div className={styles.description}>
      <h1>
        {media.original_name}{" "}
        <span className={styles.release}>
          ({new Date(media.first_air_date).toLocaleDateString(locale)})
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

export default SerieContent;
