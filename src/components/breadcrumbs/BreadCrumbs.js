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
					// Vérifier si le segment n'est pas un nombre
					!Number.isInteger(parseInt(segment)) && (
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
