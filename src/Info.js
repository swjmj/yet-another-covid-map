import React, { useState, useEffect } from "react";
import { SortDeaths, SortMortality, SortCases } from "./SortButtons";
import styles from "./styles/Info.module.css";
import useFetch from "./hooks/fetchhook";

export default function Info() {
  const { loading, data, error } = useFetch();

  const [covidData, setCovidData] = useState();

  const sortDeaths = () => {
    covidData.sort(
      (country1, country2) => country2.TotalDeaths - country1.TotalDeaths
    );
    setCovidData([...covidData]);
  };

  const sortCases = () => {
    covidData.sort(
      (country1, country2) => country2.TotalConfirmed - country1.TotalConfirmed
    );
    setCovidData([...covidData]);
  };

  const sortMortality = () => {
    covidData.sort(
      (country1, country2) =>
        country2.TotalDeaths / country2.TotalConfirmed -
        country1.TotalDeaths / country1.TotalConfirmed
    );
    setCovidData([...covidData]);
  };

  useEffect(() => {
    setCovidData(data);
  }, [loading, data]);

  if (loading || !covidData) return <h1>Loading...</h1>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  return (
    <div className={styles.info_container}>
      {/* TODO Here goes the button component to sort the list */}
      <SortDeaths onSortDeaths={sortDeaths} />
      <SortMortality onSortMortality={sortMortality} />
      <SortCases onSortCases={sortCases} />

      <hr />
      <div className={styles.table}>
        {covidData.map((country) => (
          <ul
            key={country.TotalDeaths + country.TotalConfirmed}
            className={styles.values}
          >
            <li>Country: {country.Country}</li>
            <li>Total Confirmed: {country.TotalConfirmed}</li>
            <li>Total Deaths: {country.TotalDeaths}</li>
            <li>Total Recovered: {country.TotalRecovered}</li>
            <li>
              Mortality:
              {chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100}%
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

function chopNumbers(number) {
  const newNumber = Math.round(number * 1000);

  return newNumber / 1000;
}
