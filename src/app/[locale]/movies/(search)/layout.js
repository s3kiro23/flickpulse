import SearchSideBar from "@/components/search-sidebar/SearchSideBar";
import styles from "./layout.module.scss";
import { getMovieByPath } from "@/utils/movieClient";
import { getDictionary } from "@/utils/dictionaries";

const MovieSearchLayout = async ({ children, params: { locale } }) => {
  const { genres } = await getMovieByPath("/genre/movie/list", [], locale);
  const i18n = await getDictionary(locale);

  return (
    <div className={styles.searchContainer}>
      <SearchSideBar genres={genres} i18n={i18n.searchSidebar} locale={locale}/>
      <div>{children}</div>
    </div>
  );
};

export default MovieSearchLayout;
