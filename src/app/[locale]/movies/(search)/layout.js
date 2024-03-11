import SearchSideBar from "@/components/search-sidebar/SearchSideBar";
import styles from "./layout.module.scss";
import { getMediaByPath } from "@/utils/mediaClient";
import { getDictionary } from "@/utils/dictionaries";

const MovieSearchLayout = async ({ children, params: { locale } }) => {
  const { genres } = await getMediaByPath("/genre/movie/list", [], locale);
  const i18n = await getDictionary(locale);

  return (
    <div className={styles.searchContainer}>
      <SearchSideBar
        genres={genres}
        i18n={i18n.searchSidebar}
        locale={locale}
      />
      <>{children}</>
    </div>
  );
};

export default MovieSearchLayout;
