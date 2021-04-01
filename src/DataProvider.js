import React, { createContext, useState, useEffect } from "react";
import useFetch from "./hooks/fetchhook";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const { loading: loadingAll, data: dataAll, error: errorAll } = useFetch(
    "https://api.covid19api.com/summary",
    true
  ); //fetch all the summary information for all the countries

  // TODO how to change the fetch each time a country is selected?
  const [markerPopup, setMarkerPopup] = useState("us");

  const { loading: loadingMex, data: dataMex, error: errorMex } = useFetch(
    `https://api.covid19api.com/total/country/${markerPopup}`,
    false
  ); // fetch all information for one country

  const [reverse, setReverse] = useState(false);

  const [covidData, setCovidData] = useState(null);

  const [covidDataMx, setCovidDataMx] = useState(null);

  const [dataSorted, setDataSorted] = useState("Alphabetically");

  // function to set the country of the clicked marker in the map
  const markerClick = (country) => {
    setMarkerPopup(country);
  };

  // sort functions
  const sortDeaths = () => {
    if (reverse) {
      covidData.sort(
        (country1, country2) => country1.TotalDeaths - country2.TotalDeaths
      );
    } else {
      covidData.sort(
        (country1, country2) => country2.TotalDeaths - country1.TotalDeaths
      );
    }
    setCovidData([...covidData]);
    setDataSorted("By Deaths");
  };

  const sortCases = () => {
    if (reverse) {
      covidData.sort(
        (country1, country2) =>
          country1.TotalConfirmed - country2.TotalConfirmed
      );
    } else {
      covidData.sort(
        (country1, country2) =>
          country2.TotalConfirmed - country1.TotalConfirmed
      );
    }
    setCovidData([...covidData]);
    setDataSorted("By Cases");
  };

  const sortMortality = () => {
    if (reverse) {
      covidData.sort(
        (country1, country2) =>
          country1.TotalDeaths / country1.TotalConfirmed -
          country2.TotalDeaths / country2.TotalConfirmed
      );
    } else {
      covidData.sort(
        (country1, country2) =>
          country2.TotalDeaths / country2.TotalConfirmed -
          country1.TotalDeaths / country1.TotalConfirmed
      );
    }

    setCovidData([...covidData]);
    setDataSorted("By Mortality");
  };
  // set state to reverse order of sorting
  const reverseSort = () => setReverse(!reverse);

  // fset context local states
  useEffect(() => {
    setCovidData(dataAll);
  }, [dataAll]);

  useEffect(() => {
    setCovidDataMx(dataMex);
  }, [dataMex]);

  return (
    <DataContext.Provider
      value={{
        loadingAll,
        covidData,
        dataSorted,
        dataAll,
        errorAll,
        markerClick,
        markerPopup,
        sortDeaths,
        sortCases,
        sortMortality,
        reverse,
        reverseSort,
        loadingMex,
        covidDataMx,
        errorMex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
