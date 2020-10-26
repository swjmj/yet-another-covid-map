import React, { useEffect, useState, useLayoutEffect } from "react";
import useFetch from "./hooks/fetchhook";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import style from "./styles/Map.module.css";

export default function Map() {
  const [myMap, setMymap] = useState(null);
  const { loading, data, error } = useFetch();
  // console.log(data);

  const myIcon = L.icon({
    iconUrl: "/map-icon.png",
    iconSize: [20, 35],
    iconAnchor: [15, 30],
    popupAnchor: [-3, -20],
  });

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

  useLayoutEffect(() => {
    if (!loading && !error) {
      data.map((country) => {
        L.marker([country.lat, country.lon], { icon: myIcon })
          .addTo(myMap)
          .bindPopup(
            `Country: ${country.Country} <br /> Cases: ${
              country.TotalConfirmed
            } <br /> Deaths: ${country.TotalDeaths} <br /> Mortality: ${
              chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100
            }%  <br/> Total Recovered: ${
              country.TotalRecovered
            } <br/> New Confirmed: ${country.NewConfirmed} <br/> New Deaths: ${
              country.NewDeaths
            } <br/> New Recovered: ${country.NewRecovered} <br/> Last Update: ${
              country.Date
            }`
          )
          .openPopup();
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!myMap) {
      setMymap(L.map("mapDiv").setView([27.052953, -29.257165, 0.0], 2.5));
    }
  }, [myMap]);

  return <div id="mapDiv" className={style.map}></div>;
}

function chopNumbers(number) {
  const newNumber = Math.round(number * 1000);

  return newNumber / 1000;
}
