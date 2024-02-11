import { getMovieByPath } from "@/utils/movieClient";
import React from "react";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./Popular.module.scss";

const Popular = async () => {
	const { results } = await getMovieByPath("/movie/popular");
	const { genres } = await getMovieByPath("/genre/movie/list");
	const popularMovies = results.slice(0, 6);
	return (
		<div className={styles.popular}>
			<h2>Les plus populaires</h2>
			<div className={styles.container}>
				{popularMovies.map(
					(movie) => (
						(movie.genre_ids = genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name)),
						(<MediaCard key={movie.id} media={movie} genres={movie.genre_ids} />)
					)
				)}
			</div>
		</div>
	);
};

export default Popular;
