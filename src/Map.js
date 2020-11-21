/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { DataContext } from "./DataProvider";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/Map.module.css";

export default function Map() {
  const [myMap, setMymap] = useState(null);
  const { dataAll, markerPopup, markerClick } = useContext(DataContext);

  const myIcon = L.icon({
    iconUrl: "/map-icon.png",
    iconSize: [20, 35],
    iconAnchor: [15, 30],
    popupAnchor: [-3, -20],
  });

  const onClick = (e) => markerClick(e.target.options.customId); //returns the ID of the clicked marker

  //in this hook I set up the map and tile options. Also call openstreetmap
  useLayoutEffect(() => {
    if (myMap) {
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1Ijoic3dqbWoiLCJhIjoiY2tnYnoxb2NiMDFnazJ2bnlmajF2ZGxrbiJ9.Ejv5tznj2vwnZgEmT20qMg",
        }
      ).addTo(myMap);
    }
  }, [myMap]);

  //here I set up the markers, markers options, markers popup info, bind the markers to an click action
  //Note the if else, they allow to  open the popup of the country that has been selected on the right panel
  useLayoutEffect(() => {
    if (myMap) {
      dataAll.map((country) => {
        if (country.Country === markerPopup) {
          L.marker([country.lat, country.lon], {
            customId: `${country.Country}`,
            icon: myIcon,
          })
            .addTo(myMap)
            .bindPopup(
              `Country: ${country.Country} <br /> Cases: ${
                country.TotalConfirmed
              } <br /> Deaths: ${country.TotalDeaths} <br /> Mortality: ${
                chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100
              }%  <br/> Total Recovered: ${
                country.TotalRecovered
              } <br/> New Confirmed: ${
                country.NewConfirmed
              } <br/> New Deaths: ${country.NewDeaths} <br/> New Recovered: ${
                country.NewRecovered
              } <br/> Last Update: ${country.Date}`
            )
            .on("click", onClick)
            .openPopup();
        } else {
          L.marker([country.lat, country.lon], {
            customId: `${country.Country}`,
            icon: myIcon,
          })
            .addTo(myMap)
            .bindPopup(
              `Country: ${country.Country} <br /> Cases: ${
                country.TotalConfirmed
              } <br /> Deaths: ${country.TotalDeaths} <br /> Mortality: ${
                chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100
              }%  <br/> Total Recovered: ${
                country.TotalRecovered
              } <br/> New Confirmed: ${
                country.NewConfirmed
              } <br/> New Deaths: ${country.NewDeaths} <br/> New Recovered: ${
                country.NewRecovered
              } <br/> Last Update: ${country.Date}`
            )
            .on("click", onClick);
        }
      });
    }
  }, [myMap, markerPopup]);

  //initialization of the map and bind it to div with id="mapDiv"
  useEffect(() => {
    if (!myMap) {
      setMymap(L.map("mapDiv").setView([29.052953, 0, 0.0], 2.5));
    }
  }, [myMap]);

  return <div id="mapDiv" className={style.map}></div>;
}

function chopNumbers(number) {
  const newNumber = Math.round(number * 1000);

  return newNumber / 1000;
}
