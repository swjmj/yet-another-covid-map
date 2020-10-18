import React from "react";
import Header from "./Header";
import Map from "./Map";
import Info from "./Info";
import Plots from "./Plots";
import "./styles/App.css";

function App() {
  return (
    <div className="App" id="App">
      <div id="header">
        <Header />
      </div>
      <div id="map">
        <Map />{" "}
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

//TODO Map component, I will need to do it myself. Get the map, merge countries with coordinates and construct markers.
