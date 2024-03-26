import MediaDetails from "@/components/media-details/MediaDetails";
import SimilarMedia from "@/components/similar-media/SimilarMedia";
import { getMediaByPath } from "@/utils/mediaClient";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

const MovieIdPage = async ({ params: { id, locale } }) => {
  const movie = await getMediaByPath(`/movie/${id}`, [], locale);

  if (!movie.original_title) {
    return notFound();
  }

  return (
    <div>
      <MediaDetails media={movie} type="movie"/>
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarMedia mediaId={movie.id} locale={locale} type="movie" />
      </Suspense>
    </div>
  );
};

export default MovieIdPage;
