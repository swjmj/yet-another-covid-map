import React, { useState } from "react";
import useFetch from "./fetchhook";
import countriesCoor from "../data/coordinates.json";

export default function useCountries() {
  const { loading, data, error } = useFetch();

  // function that merges fetched COVID countries info and the coordinates from the coordinates.json
  const mixCountries = ({ Countries }, countriesCoor) => {
    const mergedCountries = Countries.reduce((countries, country) => {
      if (countriesCoor[0][country["Country"]]) {
        return countries.concat([
          { ...country, ...countriesCoor[0][country["Country"]] },
        ]);
      } else {
        return countries;
      }
    }, []);
    return mergedCountries;
  };

  if (loading || error) return;

  return mixCountries({ ...data }, countriesCoor);
}
