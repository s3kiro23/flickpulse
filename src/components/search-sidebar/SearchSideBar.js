"use client";

import { usePathname, useParams, notFound } from "next/navigation";
import styles from "./SearchSideBar.module.scss";
import Form from "./form/Form";

const SearchSideBar = ({ genres, i18n, locale }) => {
	const pathname = usePathname()
	const { id } = useParams();

	const getSidebarTitle = () => {
		if (pathname.includes("movies")) {
			return i18n.movies;
		}

		if (pathname.includes("series")) {
			return i18n.series;
		}

		const genre = genres.find((genre) => genre.id === Number(id));
		if (!genre) {
			return notFound();
		}
		return genre.name;
	};

	const title = getSidebarTitle();
	console.log(pathname)
	return (
		<div className={styles.sidebar}>
			<h1>
			{pathname.includes("series") ? i18n.sTitle : ""} 
			{pathname.includes("movies") ? i18n.mTitle : ""} 
			&quot;{title}&quot;</h1>
			<Form i18n={i18n} locale={locale}/>
		</div>
	);
};

export default SearchSideBar;
