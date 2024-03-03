"use client";

import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import MovieSearch from "@/components/movie-search/MovieSearch";
import { useSelectedLayoutSegment } from "next/navigation";
import LanguageSelector from "../language-selector/LanguageSelector";

const Header = ({ locale }) => {
  const segment = useSelectedLayoutSegment();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>
          <Link href="/">FlickPulse</Link>
        </p>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li
              style={{ fontWeight: segment === "series" ? "bold" : "normal" }}
            >
              <Link href={`/${locale}/series`}>Séries</Link>
            </li>
            <li
              style={{ fontWeight: segment === "movies" ? "bold" : "normal" }}
            >
              <Link href={`/${locale}/movies`}>Films</Link>
            </li>
          </ul>
        </nav>
        <MovieSearch />
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
