"use client";

import React from "react";
import styles from "./Form.module.scss";

import { useRouter, usePathname } from "next/navigation";

const Form = ({ i18n, locale }) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const searchParams = new URLSearchParams();
    searchParams.append("sort_by", form.get("sort"));
    searchParams.append("release_date.gte", form.get("fromDate"));
    searchParams.append("release_date.lte", form.get("toDate"));

    router.push(`${pathName}?${searchParams.toString()}`);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>{i18n.filter}</h2>
      <div className={styles.date}>
        <h3>{i18n.date}</h3>
        <div>
          <p>{i18n.from}</p>
          <input type="date" name="fromDate" />
        </div>
        <div>
          <p>{i18n.to}</p>
          <input
            type="date"
            name="toDate"
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
        </div>
      </div>
      <div>
        <h3>{i18n.sort}</h3>
        <select name="sort">
          <option value="popularity.desc">{i18n.popularity}</option>
          <option value="vote_average.desc">{i18n.rating}</option>
          <option value="cote_count.desc">{i18n.countNote}</option>
          <option value="title.desc">{i18n.title}</option>
          <option value="revnue.desc">{i18n.gold}</option>
        </select>
      </div>
      <input type="submit" value="Rechercher" />
    </form>
  );
};

export default Form;
