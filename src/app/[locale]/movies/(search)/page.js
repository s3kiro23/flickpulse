import React from "react";
import SearchResults from "./SearchResults";

const MoviesPage = ({ params: { locale }, searchParams }) => {
	return <SearchResults searchParams={searchParams} locale={locale}/>;
};

export default MoviesPage;
