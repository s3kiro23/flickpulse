import React from "react";
import MoviesSearchResults from "../../MoviesSearchResults";

const GenreIdPage = ({ params: { id, locale }, searchParams }) => {
  return (
    <MoviesSearchResults searchParams={searchParams} genreId={id} locale={locale} />
  );
};

export default GenreIdPage;
