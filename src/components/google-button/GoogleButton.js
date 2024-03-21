import React from "react";
import { signIn } from "next-auth/react";
import styles from "./GoogleButton.module.scss";

const GoogleButton = () => {
  return (
    <button type="submit" className={styles.googleButton} onClick={() => signIn("google")}>GoogleButton</button>
  );
};

export default GoogleButton;
