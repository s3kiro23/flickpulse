import Genres from "@/components/genres/Genres";
import Popular from "@/components/popular/Popular";
import styles from "./page.module.css";
import { availableLocales } from "@/utils/i18n";

// Refresh page data every 24h
export const revalidate = 86400;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default function Home({ params: { locale } }) {
  return (
    <div className={styles.main}>
      <Popular locale={locale} />
      <Genres locale={locale} />
    </div>
  );
}