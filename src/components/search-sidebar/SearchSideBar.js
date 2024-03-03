"use client";

import { useSelectedLayoutSegment, useParams, notFound } from "next/navigation";
import styles from "./SearchSideBar.module.scss";
import Form from "./form/Form";

const SearchSideBar = ({ genres, i18n, locale }) => {
	const segment = useSelectedLayoutSegment();
	const { id } = useParams();

	const getSidebarTitle = () => {
		if (!segment) {
			return i18n.movies;
		}
		const genre = genres.find((genre) => genre.id === Number(id));
		if (!genre) {
			return notFound();
		}
		return genre.name;
	};

	const title = getSidebarTitle();
	return (
		<div className={styles.sidebar}>
			<h1>{i18n.title} &quot;{title}&quot;</h1>
			<Form i18n={i18n} locale={locale}/>
		</div>
	);
};

export default SearchSideBar;
