import React, { useState, useEffect } from "react";
import countriesCoor from "../data/coordinates.json";

export default function useFetch() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const mixCountries = ({ Countries }) => {
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

  useEffect(() => {
    // if (!uri) return;
    setLoading(true);
    fetch("https://api.covid19api.com/summary", { method: "GET" })
      .then((response) => response.json())
      .then((data) => mixCountries({ ...data }))
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  return { loading, data, error };
}
