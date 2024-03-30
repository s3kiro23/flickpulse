import axios from "axios";
import styles from "./page.module.scss";

import { getHydratedMedia } from "@/utils/mediaClient";
import { getDictionary } from "@/utils/dictionaries";
import { getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MediaLikes from "@/components/media-likes/MediaLikes";

const ProfilePage = async ({ params: { locale } }) => {
	const session = await getServerSession(authOptions);

	const i18n = await getDictionary(locale);
	const csrfToken = await getCsrfToken();

	if (!csrfToken) {
		throw new Error("No csrf token");
	}

	const response = await axios({
		method: "GET",
		url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medialikes/`,
		headers: {
			"Content-Type": "application/json",
			"X-XSRF-Token": csrfToken,
			Authorization: `Bearer ${session?.access_token}`,
		},
	});
	if (!response.status === 200) {
		throw new Error("Failed to fetch media likes");
	}
	const mediaLikes = await response.data;

	const medias = await getHydratedMedia(
		mediaLikes.data.map((media) => media),
		locale
	);

	return (
		<div className={styles.profile}>
			<MediaLikes
				medias={medias}
				i18n={i18n}
				type="movie"
				locale={locale}
			/>
			<MediaLikes
				medias={medias}
				i18n={i18n}
				type="tv"
				locale={locale}
			/>
		</div>
	);
};

export default ProfilePage;
