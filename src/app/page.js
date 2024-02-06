import styles from "./page.module.css";
import MediaCard from "@/components/MediaCard/MediaCard";

export default function Home() {
	return (
		<main className={styles.main}>
			<MediaCard />
		</main>
	);
}
