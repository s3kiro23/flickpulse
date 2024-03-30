import "server-only";

export const getMediaByPath = (path, params = [], language = "fr-FR") => {
	const url = new URL(`${process.env.TMDB_API_URL}${path}`);
	url.searchParams.append("api_key", process.env.TMDB_API_KEY);
	url.searchParams.append("language", language);
	params
		.filter((param) => param.value)
		.forEach((param) => {
			url.searchParams.append(param.key, param.value);
		});

	return fetch(url).then((res) => res.json());
};

export const getHydratedMedia = async (medias, language = "fr-FR") => {
	const mediaPromises = medias.map((media) => getMediaByPath(`/${media.media_type}/${media.media_id}`, [], language));

	const mediaList = await Promise.all(mediaPromises);

	return mediaList;
};
