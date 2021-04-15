import React from "react";
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.container}>World Map - Covid19 Cases </div>
      <div className={styles.name}>
        Made by{" "}
        <a
          href="https://twitter.com/angelobluedot"
          target="_blank"
          rel="noopener noreferrer"
        >
          Angelo Martínez
        </a>{" "}
      </div>
      <div className={styles.name}>
        Covid data source{" "}
        <a
          href="https://covid19api.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          covid19api
        </a>
      </div>
    </>
  );
}
