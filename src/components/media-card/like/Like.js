"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const Like = ({ mediaId, type }) => {
  const { data: session } = useSession();

  const handleLikeCLicked = (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
    }
    if (type === "serie") type = "tv";
    fetch(`/api/like/${mediaId}`, {
      method: "POST",
      body: JSON.stringify({ type: type }),
    });
  };

  return (
    <div onClick={handleLikeCLicked}>
      <FontAwesomeIcon icon={faHeart}/>
    </div>
  );
};

export default Like;
