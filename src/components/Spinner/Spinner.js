import React from "react";
import styles from "./styles.module.css";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
