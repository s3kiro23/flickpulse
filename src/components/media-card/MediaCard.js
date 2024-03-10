import React from "react";
import Image from "next/image";
import styles from "./MediaCard.module.scss";
import Link from "next/link";
import Badges from "@/components/badges/Badges";
import { getDictionary } from "@/utils/dictionaries";
import Like from "./like/Like";

const MediaCard = async ({ media, genres, locale, type }) => {
  const i18n = await getDictionary(locale);
  if (type === "tv") type = "serie";
  return (
    <div className={styles.card}>
      <Link href={`/${locale}/${type}s/${media.id}`}>
        <div className={styles.image}>
          <Like mediaId={media.id} type={type} />
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}w500/${media.poster_path}`}
            alt={type === "serie" ? media.original_name : media.title}
            fill
            sizes="width: 100%, height: 300px"
          />
        </div>
        <div className={styles.content}>
          <p className={styles.vote}>{media.vote_average}</p>
          {type === "serie" ? <h3>{media.name}</h3> : <h3>{media.title}</h3>}
          {type === "serie" ? (
            <p>
              {i18n.card.date}{" "}
              {new Date(media.first_air_date).toLocaleDateString(locale)}
            </p>
          ) : (
            <p>
              {i18n.card.date}{" "}
              {new Date(media.release_date).toLocaleDateString(locale)}
            </p>
          )}
        </div>
        <Badges genres={genres} />
      </Link>
    </div>
  );
};

export default MediaCard;
