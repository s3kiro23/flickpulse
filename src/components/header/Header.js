"use client";

import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import MovieSearch from "@/components/movie-search/MovieSearch";
import { useSelectedLayoutSegment } from "next/navigation";
import LanguageSelector from "../language-selector/LanguageSelector";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import LogoutButton from "../logout-button/LogoutButton";

const Header = ({ locale, i18n }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const segment = useSelectedLayoutSegment();
  const { status } = useSession();
  const userIconRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userIconRef.current && !userIconRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div
          ref={userIconRef}
          className={
            dropdownOpen ? `${styles.userIcon} ${styles.open}` : styles.userIcon
          }
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Link href={`/${locale}/user/profile`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          {status == "authenticated" && dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href={`/${locale}/user/profile`}>{i18n.profile}</Link>
              <LogoutButton i18n={i18n.logout} />
            </div>
          )}
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
