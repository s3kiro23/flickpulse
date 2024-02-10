import React from "react";
import styles from "./Badges.module.scss";

const Badge = ({ genres }) => {
	return (
		<div className={styles.container}>
			{genres.map((genre) => (
				<div className={styles.badge} key={genre.id}>{genre}</div>
			))}
		</div>
	);
};

export default Badge;
