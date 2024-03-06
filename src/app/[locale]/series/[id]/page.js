import MediaDetails from "@/components/media-details/MediaDetails";
import SimilarMedia from "@/components/similar-media/SimilarMedia";
import { getMediaByPath } from "@/utils/mediaClient";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

const SerieIdPage = async ({ params: { id, locale } }) => {
  const serie = await getMediaByPath(`/tv/${id}`, [], locale);

  if (!serie.original_name) {
    return notFound();
  }

  return (
    <div>
      <MediaDetails media={serie} type="tv"/>
      <Suspense fallback={<p>Chargement...</p>}>
        <SimilarMedia mediaId={serie.id} locale={locale} type="tv"/>
      </Suspense>
    </div>
  );
};

export default SerieIdPage;
