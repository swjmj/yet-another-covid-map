import React, { useContext } from "react";
import { DataContext } from "./DataProvider";

import numeral from "numeral";

import {
  SortDeaths,
  SortMortality,
  SortCases,
  ReverseSort,
} from "./SortButtons";

import styles from "./styles/Info.module.css";

export default function Info() {
  const {
    covidData,
    markerClick,
    sortDeaths,
    sortCases,
    sortMortality,
    reverse,
    reverseSort,
  } = useContext(DataContext);

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  // const [reverse, setReverse] = useState(false);

  // const [covidData, setCovidData] = useState(data);

  // const sortDeaths = () => {
  //   if (reverse) {
  //     covidData.sort(
  //       (country1, country2) => country1.TotalDeaths - country2.TotalDeaths
  //     );
  //   } else {
  //     covidData.sort(
  //       (country1, country2) => country2.TotalDeaths - country1.TotalDeaths
  //     );
  //   }
  //   setCovidData([...covidData]);
  // };

  // const sortCases = () => {
  //   if (reverse) {
  //     covidData.sort(
  //       (country1, country2) =>
  //         country1.TotalConfirmed - country2.TotalConfirmed
  //     );
  //   } else {
  //     covidData.sort(
  //       (country1, country2) =>
  //         country2.TotalConfirmed - country1.TotalConfirmed
  //     );
  //   }
  //   setCovidData([...covidData]);
  // };

  // const sortMortality = () => {
  //   if (reverse) {
  //     covidData.sort(
  //       (country1, country2) =>
  //         country1.TotalDeaths / country1.TotalConfirmed -
  //         country2.TotalDeaths / country2.TotalConfirmed
  //     );
  //   } else {
  //     covidData.sort(
  //       (country1, country2) =>
  //         country2.TotalDeaths / country2.TotalConfirmed -
  //         country1.TotalDeaths / country1.TotalConfirmed
  //     );
  //   }

  //   setCovidData([...covidData]);
  // };

  return (
    <div className={styles.info_container}>
      <SortDeaths onSortDeaths={sortDeaths} />
      <SortMortality onSortMortality={sortMortality} />
      <SortCases onSortCases={sortCases} />
      <ReverseSort reverse={reverse} onReverseSort={reverseSort} />

      <hr />
      <div className={styles.table}>
        {covidData.map((country) => (
          <ul
            key={country.Country}
            className={styles.values}
            onClick={() => markerClick(country.Country)}
          >
            <li>Country: {country.Country}</li>
            <li>
              Total Confirmed: {numeral(country.TotalConfirmed).format("0,0")}
            </li>
            <li>Total Deaths: {numeral(country.TotalDeaths).format("0,0")}</li>
            <li>
              Total Recovered: {numeral(country.TotalRecovered).format("0,0")}
            </li>
            <li>
              Mortality:
              {numeral(
                chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100
              ).format("0,0.00")}
              %
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
