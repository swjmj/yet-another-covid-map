import React, { createContext } from "react";
import useFetch from "./hooks/fetchhook";

import Header from "./Header";
import Map from "./Map";
import Info from "./Info";
import Plots from "./Plots";
import "./styles/App.css";

// TODO Add a context component with the fetch state

export const CountriesContext = createContext();

function App() {
  const { loading, data, error } = useFetch();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  return (
    <CountriesContext.Provider value={data}>
      <div className="App" id="App">
        <div id="header">
          <Header />
        </div>
        <div id="map">
          <Map />
        </div>
        <div id="info">
          <Info />
        </div>
        <div id="plot">
          <Plots />
        </div>
      </div>
    </CountriesContext.Provider>
  );
}

export default App;
