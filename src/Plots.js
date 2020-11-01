import React from "react";
import BarPlot from "./BarPlot";
import PointPlot from "./PointPlot";

import style from "./styles/Plot.module.css";

export default function Plots() {
  return (
    <div className={style.plots_container}>
      <BarPlot />
      <PointPlot />
    </div>
  );
}
