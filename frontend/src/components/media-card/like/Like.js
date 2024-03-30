"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const Like = ({ mediaId, type }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLikeCLicked = (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
    }
    console.log(session);
    if (type === "serie") type = "tv";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/medialikes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ media_type: type, media_id: mediaId.toString() }),
    })

  };

  return (
    <div onClick={handleLikeCLicked}>
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
};

export default Like;
