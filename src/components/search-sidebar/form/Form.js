"use client";
import styles from "./Form.module.scss";

import { useRouter, usePathname } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const pathName = usePathname();
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const searchParams = new URLSearchParams();
		searchParams.append("sort_by", form.get("sort"));
		searchParams.append("release_date.gte", form.get("fromDate"));
		searchParams.append("release_date.lte", form.get("toDate"));

    router.push(`${pathName}?${searchParams.toString()}`)
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<h2>Filtrer</h2>
			<div className={styles.date}>
				<h3>Date de sortie</h3>
				<div>
					<p>Du</p>
					<input type="date" name="fromDate" />
				</div>
				<div>
					<p>au</p>
					<input type="date" name="toDate" defaultValue={new Date().toISOString().substring(0, 10)} />
				</div>
			</div>
			<div>
				<h3>Trier par</h3>
				<select name="sort">
					<option value="popularity.desc">Popularité</option>
					<option value="vote_average.desc">Note</option>
					<option value="cote_count.desc">Nombre de note</option>
					<option value="title.desc">Titre</option>
					<option value="revnue.desc">Revenues</option>
				</select>
			</div>
			<input type="submit" value="Rechercher" />
		</form>
	);
};

export default Form;
