import React from "react";
import SearchResults from "./MoviesSearchResults";

const MoviesPage = ({ params: { locale }, searchParams }) => {
  return <SearchResults searchParams={searchParams} locale={locale} />;
};

export default MoviesPage;
