import React from "react";
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.container}>World map of cases of covid. </div>
      <div className={styles.name}>Made by Angelo Martínez</div>
    </>
  );
}
