import React from "react";
//import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";

import { getHydratedMedia } from "@/utils/mediaClient";
import { getDictionary } from "@/utils/dictionaries";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./page.module.scss";
import { useSession, getCsrfToken } from "next-auth/react";
import { cookies } from "next/headers";

const ProfilePage = async ({ params: { locale }, res }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token").value;

  const i18n = await getDictionary(locale);
  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    throw new Error("No csrf token");
  }

  const mediaLikes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medialikes/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-Token": csrfToken,
        Authorization: "Bearer " + token,
      },
    },
  )
    .catch((error) => NextResponse.json({ error }))
    .then((response) => {
      if (response.ok) {
        console.log("response:", response);
      }
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
