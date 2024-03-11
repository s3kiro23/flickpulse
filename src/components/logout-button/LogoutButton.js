"use client";
import { signOut } from "next-auth/react";
import styles from "./LogoutButton.module.scss";

const LogoutButton = ({ i18n }) => {
  return (
    <>
      <button
        className={styles.button}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        {i18n}
      </button>
    </>
  );
};

export default LogoutButton;
