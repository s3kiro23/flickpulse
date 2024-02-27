import Genres from "@/components/genres/Genres";
import Popular from "@/components/popular/Popular";

// Refresh page data every 24h
export const revalidate = 86400;

export default function Home() {
	return (
		<>
			<Popular />
			<Genres />
		</>
	);
}
