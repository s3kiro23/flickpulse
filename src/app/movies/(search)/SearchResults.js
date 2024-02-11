import React from "react";
import styles from "./SearchResults.module.scss";
import MediaCard from "@/components/media-card/MediaCard";
import { getMovieByPath } from "@/utils/movieClient";

const SearchResults = async ({ searchParams, genreId }) => {
	const { results } = await getMovieByPath("/discover/movie", [
		{ key: "sort_by", value: searchParams.sort_by },
		{ key: "release_date.gte", value: searchParams["release_date.gte"] },
		{ key: "release_date.lte", value: searchParams["release_date.lte"] },
		{ key: "with_genres", value: genreId },
	]);
    const { genres } = await getMovieByPath("/genre/movie/list");
	return (
		<div className={styles.results}>
			{results
				.filter((movie) => movie.poster_path)
				.map((movie) => (
                    (movie.genre_ids = genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name)),
					<MediaCard key={movie.id} media={movie} genres={movie.genre_ids}/>
				))}
		</div>
	);
};

export default SearchResults;
