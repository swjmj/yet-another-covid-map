import React, { useContext } from "react";
import { DataContext } from "./DataProvider";

import PopSideBar from "./PopSideBar";
import Header from "./Header";
import Map from "./Map";
import Info from "./Info";
import Plots from "./Plots";
import "./styles/App.css";
import style from "./styles/App.module.css";

//spiner import
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// TODO comment everything...the thing in the provider is kind of confusing

function LoadScreen() {
  return (
    <div className={style.loadScreen}>
      <Loader type="Grid" color="White" height={80} width={80} />
    </div>
  );
}

function App() {
  const { loadingAll, errorAll } = useContext(DataContext);

  if (loadingAll) return <LoadScreen />;
  if (errorAll) return <p>{JSON.stringify(errorAll, null, 2)}</p>;

  return (
    <div className="App" id="App">
      <PopSideBar />
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
