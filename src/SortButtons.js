import React from "react";
import { Icon } from "react-icons-kit";
import { top } from "react-icons-kit/iconic/top";
import { bottom } from "react-icons-kit/iconic/bottom";

export function SortDeaths({ onSortDeaths = (f) => f }) {
  return <button onClick={() => onSortDeaths()}>Sort by Deaths</button>;
}

export function SortCases({ onSortCases = (f) => f }) {
  return <button onClick={() => onSortCases()}>Sort by Cases</button>;
}

export function SortMortality({ onSortMortality = (f) => f }) {
  return <button onClick={() => onSortMortality()}>Sort by Mortality</button>;
}

export function ReverseSort({ reverse, onReverseSort = (f) => f }) {
  return (
    <button onClick={() => onReverseSort()}>
      {reverse ? <Icon icon={top} /> : <Icon icon={bottom} />}
    </button>
  );
}
