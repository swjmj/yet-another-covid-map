import React from "react";

import Header from "./Header";
import Map from "./Map";
import Info from "./Info";
import Plots from "./Plots";
import "./styles/App.css";

// TODO Add a context component with the fetch state

function App() {
  return (
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
  );
}

export default App;
