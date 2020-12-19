import React, { useContext } from "react";
import { DataContext } from "./DataProvider";

import Instructions from "./Instructions";
import Header from "./Header";
import Map from "./Map";
import Info from "./Info";
import Plots from "./Plots";
import "./styles/App.css";

// TODO comment everything...the thing in the provider is kind of confusing

function App() {
  const { loadingAll, errorAll } = useContext(DataContext);

  if (loadingAll) return <h1>Loading...</h1>;
  if (errorAll) return <p>{JSON.stringify(errorAll, null, 2)}</p>;

  return (
    <div className="App" id="App">
      <Instructions />
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
  );
}

export default App;
