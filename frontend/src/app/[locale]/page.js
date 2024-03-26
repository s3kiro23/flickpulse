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
      <Popular locale={locale} type="movie"/>
      <Genres locale={locale} type="movie"/>

      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Badge</span>

      <Popular locale={locale} type="tv"/>
      <Genres locale={locale} type="tv"/>
    </div>
  );
}
