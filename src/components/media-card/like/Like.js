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
    if (type === "serie") type = "tv";
    fetch(`/api/like/${mediaId}`, {
      method: "POST",
      body: JSON.stringify({ type: type }),
    });
  };

  return (
    <div onClick={handleLikeCLicked}>
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
};

export default Like;
