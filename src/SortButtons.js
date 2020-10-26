import React from "react";

export function SortDeaths({ onSortDeaths = (f) => f }) {
  return <button onClick={() => onSortDeaths()}>Sort by Deaths</button>;
}

export function SortCases({ onSortCases = (f) => f }) {
  return <button onClick={() => onSortCases()}>Sort by Cases</button>;
}

export function SortMortality({ onSortMortality = (f) => f }) {
  return <button onClick={() => onSortMortality()}>Sort by Mortality</button>;
}
