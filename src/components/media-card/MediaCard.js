import React from "react";
import Image from "next/image";
import styles from "./MediaCard.module.scss";
import Link from "next/link";
import Badges from "@/components/badges/Badges";

const MediaCard = ({ media, genres }) => {
	return (
		<div className={styles.card}>
			<Link href={`/movies/${media.id}`}>
				<div className={styles.image}>
					<Image
						src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}${media.poster_path}`}
						alt={media.title}
						fill
						sizes="width: 100%, height: 300px"
					/>
				</div>
				<div className={styles.content}>
					<p className={styles.vote}>{media.vote_average}</p>
					<h3>{media.title}</h3>
					<p>Le {new Date(media.release_date).toLocaleDateString("fr-FR")}</p>
				</div>
				<Badges genres={genres} />
			</Link>
		</div>
	);
};

export default MediaCard;
