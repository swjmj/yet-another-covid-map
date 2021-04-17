import React from "react";
import style from "./styles/Loading.module.css";

//spiner import
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    // <div className={style.loadScreen}>
    <Loader type="Grid" color="White" height={80} width={80} />
    // </div>
  );
}
