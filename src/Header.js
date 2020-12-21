import React from "react";
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.container}>World map of cases of covid. </div>
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
      <div>
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
