"use client";

import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import MovieSearch from "@/components/movie-search/MovieSearch";
import { useSelectedLayoutSegment } from "next/navigation";
import LanguageSelector from "../language-selector/LanguageSelector";
import { useSession } from "next-auth/react";

const Header = ({ locale, i18n }) => {
  const segment = useSelectedLayoutSegment();
  const { status } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={styles.brand}>
          <span className={styles.brandBottom}></span>
          <Link href={`/${locale}`}>FlickPulse</Link>
        </h1>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li
              style={{ fontWeight: segment === "series" ? "bold" : "normal" }}
            >
              <Link href={`/${locale}/series`}>{i18n.menu2}</Link>
            </li>
            <li
              style={{ fontWeight: segment === "movies" ? "bold" : "normal" }}
            >
              <Link href={`/${locale}/movies`}>{i18n.menu1}</Link>
            </li>
            {status == "unauthenticated" && (
              <li
                style={{ fontWeight: segment === "signup" ? "bold" : "normal" }}
              >
                <Link href={`/${locale}/signup`}>{i18n.menu3}</Link>
              </li>
            )}
          </ul>
        </nav>
        <MovieSearch i18n={i18n.search} />
        <div className={styles.userIcon}>
          <Link href={`/${locale}/user/profile`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
