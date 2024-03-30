import React from "react";

import MediaCard from "@/components/media-card/MediaCard";
import styles from "./mediaLikes.module.scss";

const MediaLikes = ({ medias, i18n, type, locale }) => {
	const isMovie = type === "movie";
	const filteredMedias = medias.filter((media) => (isMovie ? !media.last_air_date : media.last_air_date));

	return (
		<div className={styles.section}>
			<h1>{isMovie ? i18n.profile.moviesTitle : i18n.profile.seriesTitle}</h1>
			{filteredMedias.length === 0 ? (
				<div className={styles.list}>
					<span>Aucune données n&apos;est disponible</span>
				</div>
			) : (
				<div className={styles.list}>
					{filteredMedias.map((media) => {
						media.genres = media.genres.map((genre) => genre.name);
						return (
							<MediaCard
								key={media.id}
								media={media}
								locale={locale}
								genres={media.genres}
								type={isMovie ? "movie" : "tv"}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MediaLikes;
