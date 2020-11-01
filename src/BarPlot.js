import React, { useContext } from "react";
import { DataContext } from "./DataProvider";

import CanvasJSReact from "./lib/canvasjs.react";
import style from "./styles/BarPlots.module.css";

export default function BarPlot() {
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const { covidData, dataSorted } = useContext(DataContext);
  const dataChop = covidData.slice(0, 10);

  const addSymbols = (e) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };

  const options = {
    animationEnabled: true,
    theme: "dark1",
    title: {
      text: `Covid-19 World  sorted ${dataSorted} `,
    },
    axisX: {
      title: "Country",
      reversed: true,
    },
    axisY: {
      title: "No. of cases",
      includeZero: true,
      labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: selectRender(dataChop, dataSorted),
      },
    ],
    // width: "500",
    // height: "320",
  };

  return (
    <div className={style.bar_plot}>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}

function selectRender(dataChop, dataSorted) {
  switch (dataSorted) {
    case "Alphabetically":
      return dataChop.reduce((prev, country) => {
        return [...prev, { y: country.TotalConfirmed, label: country.Country }];
      }, []);
    case "By Deaths":
      return dataChop.reduce((prev, country) => {
        return [...prev, { y: country.TotalDeaths, label: country.Country }];
      }, []);
    case "By Cases":
      return dataChop.reduce((prev, country) => {
        return [...prev, { y: country.TotalConfirmed, label: country.Country }];
      }, []);
    case "By Mortality":
      return dataChop.reduce((prev, country) => {
        return [
          ...prev,
          {
            y: chopNumbers(country.TotalDeaths / country.TotalConfirmed) * 100,
            label: country.Country,
          },
        ];
      }, []);

    default: {
      console.log("don't know");
    }
  }
}

function chopNumbers(number) {
  const newNumber = Math.round(number * 1000);

  return newNumber / 1000;
}
