import MovieDetails from "@/components/movie-details/MovieDetails";
import SimilarMedia from "@/components/similar-media/SimilarMedia";
import { getMediaByPath } from "@/utils/mediaClient";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

const SerieIdPage = async ({ params: { id, locale } }) => {
  const serie = await getMediaByPath(`/tv/${id}`, [], locale);

  if (!serie.original_title) {
    return notFound();
  }

  return (
    <div>
      <MovieDetails serie={serie} />
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarMedia movieId={serie.id} locale={locale} />
      </Suspense>
    </div>
  );
};

export default SerieIdPage;
