import React from "react";
import SeriesSearchResults from "./SeriesSearchResults";

const SeriesPage = ({ params: { locale }, searchParams }) => {
  return <SeriesSearchResults searchParams={searchParams} locale={locale} />;
};

export default SeriesPage;
