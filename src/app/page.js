import Genres from "@/components/genres/Genres";
import styles from "./page.module.css";
import Popular from "@/components/popular/Popular";

// Refresh page data every 24h
export const revalidate = 86400

export default function Home() {
	return (
		<main className={styles.main}>
			<Popular />
			<Genres />
		</main>
	);
}
