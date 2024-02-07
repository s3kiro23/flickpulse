import styles from "./page.module.css";
import Popular from "@/components/Popular/Popular";

export default function Home() {
	return (
		<main className={styles.main}>
			<Popular />
		</main>
	);
}
