import "./globals.scss";
import Header from "../components/header/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { roboto, montserrat } from "@/font";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";
import styles from "./page.module.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${montserrat.variable}`}>
				<Header />
				<main className={styles.main}>
					<BreadCrumbs/>
					{children}
				</main>
			</body>
		</html>
	);
}
