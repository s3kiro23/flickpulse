"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import styles from "./BreadCrumbs.module.scss";

const BreadCrumbs = () => {
	const segments = useSelectedLayoutSegments().filter((segment) => !segment.startsWith("("));

	return (
		<div className={styles.breadcrumbs}>
			<Link href="/">Accueil</Link>
			<span> &gt; </span>
			{segments.map(
				(segment, index) =>
					!Number.isInteger(parseInt(segment)) && segment !== "fr" && segment !== "en" && (
						<span key={index}>
							{index !== 0 && segments[index - 1] === segment ? (
								<span>
									<Link href={segment}>{segment}</Link>
								</span>
							) : (
								<Link href={`/${segments.slice(0, index + 1).join("/")}`}>{segment}</Link>
							)}
							{index !== segments.length - 1 && !Number.isInteger(parseInt(segments[index + 1])) && <span> &gt; </span>}
						</span>
					)
			)}
		</div>
	);
};

export default BreadCrumbs;
