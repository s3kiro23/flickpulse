import Genres from "@/components/genres/Genres";
import styles from "./page.module.css";
import Popular from "@/components/popular/Popular";

export default function Home() {
	return (
		<main className={styles.main}>
			<Popular />
			<Genres />
		</main>
	);
}
