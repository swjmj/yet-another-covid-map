import React, { useState, useEffect } from "react";
import countriesCoor from "../data/coordinates.json";

export default function useFetch(url, type) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const mixCountriesObj = ({ Countries }) => {
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

  const mixCountriesArr = (Countries) => {
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
    // TODO select correct fetch data returned, maybe a marker to select from the arguments of useFetch
    setLoading(true);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) =>
        type ? mixCountriesObj({ ...data }) : mixCountriesArr(data)
      )
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, [url]);
  return { loading, data, error };
}
