"use client";

import styles from "./LanguageSelector.module.scss";

import { availableLocales } from "@/utils/i18n";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";
import React from "react";
import Link from "next/link";

const LanguageSelector = () => {
  const currentLanguage = useCurrentLanguage();

  return (
    <div className={`${styles.selector}`}>
      <p>{currentLanguage}</p>
      <span>|</span>
      <p>
        {availableLocales
          .filter((locale) => locale !== currentLanguage)
          .map((locale) => (
            <Link href={`/${locale}`} key={locale}>
              {locale}
            </Link>
          ))}
      </p>
    </div>
  );
};

export default LanguageSelector;
