import React from "react";
import styles from "./Skeletons.module.scss";

const MediaCardSkeletons = () => {
  return (
    <div className={`${styles.shimmer} ${styles.container}`}>
      <div className={styles.firstElement}>
        <div className={styles.firstElementStChild} />
        <div className={styles.firstElementSecChild} />
      </div>
      <div className={styles.secondElement}>
        <div />
      </div>
    </div>
  );
};

export default MediaCardSkeletons;
