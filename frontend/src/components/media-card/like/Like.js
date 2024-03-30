"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Like = ({ mediaId, type }) => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleLikeCLicked = (e) => {
		e.preventDefault();
		if (!session) {
			router.push("/login");
		}
		if (type === "serie") type = "tv";
		axios({
			method: "POST",
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medialikes/`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.access_token}`,
			},
			data: JSON.stringify({ media_type: type, media_id: mediaId.toString() }),
		});
	};

	return (
		<div onClick={handleLikeCLicked}>
			<FontAwesomeIcon icon={faHeart} />
		</div>
	);
};

export default Like;
