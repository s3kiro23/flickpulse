import { getHydratedMedia } from "@/utils/mediaClient";
import { getDictionary } from "@/utils/dictionaries";
import MediaCard from "@/components/media-card/MediaCard";
import styles from "./page.module.scss";
import { getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

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
			<div className={styles.section}>
				<h1>{i18n.profile.moviesTitle}</h1>
				{medias.filter((media) => !media.last_air_date).length == 0 ? (
					<div className={styles.list}>
						{" "}
						<span>Aucune données n&apos;est disponible</span>
					</div>
				) : (
					<div className={styles.list}>
						{medias
							.filter((media) => !media.last_air_date)
							.map(
								(media) => (
									(media.genres = media.genres.map((genre) => genre.name)),
									(
										<MediaCard
											key={media.id}
											media={media}
											locale={locale}
											genres={media.genres}
											type="movie"
										/>
									)
								)
							)}
					</div>
				)}
			</div>
			<div className={styles.section}>
				<h1>{i18n.profile.seriesTitle}</h1>
				{medias.filter((media) => media.last_air_date).length == 0 ? (
					<div className={styles.list}>
						{" "}
						<span>Aucune données n&apos;est disponible</span>
					</div>
				) : (
					<div className={styles.list}>
						{medias
							.filter((media) => media.last_air_date)
							.map(
								(media) => (
									(media.genres = media.genres.map((genre) => genre.name)),
									(
										<MediaCard
											key={media.id}
											media={media}
											locale={locale}
											genres={media.genres}
											type="serie"
										/>
									)
								)
							)}
					</div>
				)}
			</div>
			;
		</div>
	);
};

export default ProfilePage;
