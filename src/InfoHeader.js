import React from "react";

export default function InfoHeader() {
  return (
    <div className={styles.header}>
      <p>Arrange info by (highest to lowest):</p>
      <button>Total Infected</button>
      <button>Total Deaths</button>
      <button>Newly Infected</button>
    </div>
  );
}
