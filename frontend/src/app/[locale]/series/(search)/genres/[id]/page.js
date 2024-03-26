import React from "react";
import SeriesSearchResults from "../../SeriesSearchResults";

const GenreIdPage = ({ params: { id, locale }, searchParams }) => {
  return (
    <SeriesSearchResults searchParams={searchParams} genreId={id} locale={locale} />
  );
};

export default GenreIdPage;
