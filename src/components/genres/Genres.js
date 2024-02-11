import { getMovieByPath } from "@/utils/movieClient";
import React from "react";
import Link from "next/link";
import styles from "./Genres.module.scss";

const Genres = async () => {
	const { genres } = await getMovieByPath("/genre/movie/list");
	return (
		<div>
			<h2>Parcourir par genres</h2>
			<div className={styles.container}>
				{genres.map((genre) => (
					<Link key={genre.id} href={`/movies/genres/${genre.id}`} className={styles.genre}>
						<p>{genre.name}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Genres;
