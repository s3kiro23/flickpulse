import React from "react";
import Image from "next/image";
import styles from "./MediaCredits.module.scss";
import { getMediaByPath } from "@/utils/mediaClient";

const MediaCredits = async ({ mediaId, type }) => {
  const { cast } = await getMediaByPath(`/${type}/${mediaId}/credits`);
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

export default MediaCredits;
