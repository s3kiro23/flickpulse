import React from "react";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";

import { getHydratedMedia } from "@/utils/mediaClient";
import { getDictionary } from "@/utils/dictionaries";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";

const ProfilePage = async ({ params: { locale }, res }) => {
  const { user: userSession } = (await getServerSession()) || {};

  const i18n = await getDictionary(locale);

  const { mediaLikes } = await prisma.user.findFirst({
    where: {
      email: userSession?.email,
    },
    include: {
      mediaLikes: true,
    },
  });

  const medias = await getHydratedMedia(
    mediaLikes.map((media) => media),
    locale,
  );

  return (
    <div className={styles.profile}>
      <div className={styles.section}>
        <h1>{i18n.profile.moviesTitle}</h1>
        {medias.filter((media) => !media.last_air_date).length == 0 ? (
          <div className={styles.list}>
            {" "}
            <span>Aucune données n&apos;est disponible</span>
          </div>
        ) : (
          <div className={styles.list}>
            {medias
              .filter((media) => !media.last_air_date)
              .map(
                (media) => (
                  (media.genres = media.genres.map((genre) => genre.name)),
                  (
                    <MediaCard
                      key={media.id}
                      media={media}
                      locale={locale}
                      genres={media.genres}
                      type="movie"
                    />
                  )
                ),
              )}
          </div>
        )}
      </div>
      <div className={styles.section}>
        <h1>{i18n.profile.seriesTitle}</h1>
        {medias.filter((media) => media.last_air_date).length == 0 ? (
          <div className={styles.list}>
            {" "}
            <span>Aucune données n&apos;est disponible</span>
          </div>
        ) : (
          <div className={styles.list}>
            {medias
              .filter((media) => media.last_air_date)
              .map(
                (media) => (
                  (media.genres = media.genres.map((genre) => genre.name)),
                  (
                    <MediaCard
                      key={media.id}
                      media={media}
                      locale={locale}
                      genres={media.genres}
                      type="serie"
                    />
                  )
                ),
              )}
          </div>
        )}
      </div>
      ;
    </div>
  );
};

export default ProfilePage;
