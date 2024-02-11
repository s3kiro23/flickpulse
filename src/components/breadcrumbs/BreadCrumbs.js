"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import styles from "./BreadCrumbs.module.scss";

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const BreadCrumbs = () => {
	const segments = useSelectedLayoutSegments().filter((segment) => !segment.startsWith("("));
	console.log(segments);
	return (
		<div className={styles.breadcrumbs}>
			{segments.map((segment, index) => (
				<span key={index}>
					{index !== 0 && segments[index - 1] === segment ? (
						<span>
							<Link href={segment}>{capitalizeFirstLetter(segment)}</Link>
						</span>
					) : (
						<Link href={`/${segments.slice(0, index + 1).join("/")}`}>{capitalizeFirstLetter(segment)}</Link>
					)}
					{index !== segments.length - 1 && <span> &gt; </span>}
				</span>
			))}
		</div>
	);
};

export default BreadCrumbs;
