import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import style from "./styles/PointPlot.module.css";

import CanvasJSReact from "./lib/canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PointPlot() {
  const { loadingMex, covidDataMx, errorMex, markerPopup } = useContext(
    DataContext
  );

  if (loadingMex) return <h2>Loading...</h2>;
  if (errorMex) return <p>{JSON.stringify(errorMex, null, 2)}</p>;

  const options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: `Total Cases - Deaths - ${markerPopup}`,
    },
    theme: "dark1",
    axisX: {
      valueFormatString: "D/M/YYYY",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      valueFormatString: "##",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return CanvasJS.formatNumber(e.value, "##");
        },
      },
    },

    data: [
      {
        type: "spline",
        yValueFormatString: "#",
        xValueFormatString: "D/M/YYYY",
        dataPoints: covidDataMx.map((country, i) => ({
          x: new Date(country.Date),
          y: country.Confirmed,
        })),
      },
      {
        type: "spline",
        yValueFormatString: "#",
        xValueFormatString: "D/M/YYYY",
        dataPoints: covidDataMx.map((country, i) => ({
          x: new Date(country.Date),
          y: country.Deaths,
        })),
      },
    ],
    // random data
  };

  return (
    <div className={style.pointPlot}>
      <CanvasJSChart options={options} />
    </div>
  );
}
