"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MovieSearch from "@/components/movie-search/MovieSearch";
import LanguageSelector from "../language-selector/LanguageSelector";
import LogoutButton from "../logout-button/LogoutButton";

const Header = ({ locale, i18n }) => {
  const { status } = useSession();
  const segment = useSelectedLayoutSegment();
  const userIconRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
      </div>
      <div className={styles.logo}>
        <h1 className={styles.brand}>
          <span className={styles.brandBottom}></span>
          <Link href={`/${locale}`}>FlickPulse</Link>
        </h1>
      </div>
      <div
        className={`${styles.navigation} ${menuOpen ? styles.showMenu : ""}`}
      >
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
          <MovieSearch i18n={i18n.search} />
          <LanguageSelector />
        </nav>
      </div>
      <div
        ref={userIconRef}
        className={
          dropdownOpen ? `${styles.userIcon} ${styles.open}` : styles.userIcon
        }
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {status === "unauthenticated" ? (
          <Link href={`/${locale}/user/profile`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        ) : (
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
        {status === "authenticated" && dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Link href={`/${locale}/user/profile`}>{i18n.profile}</Link>
            <LogoutButton i18n={i18n.logout} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
