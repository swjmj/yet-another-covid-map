import React, { useState, useRef, useEffect } from "react";
import inst_1 from "./IMG/covid_map_instructionsArtboard-1.png";
import inst_2 from "./IMG/covid_map_instructionsArtboard-2.png";
import inst_3 from "./IMG/covid_map_instructionsArtboard-3.png";
import inst_4 from "./IMG/covid_map_instructionsArtboard-4.png";

import style from "./styles/Instructions.module.css";

export default function PopSideBar() {
  const [content, setContent] = useState(false);
  const myRef = useRef(false);
  const buttonRef = useRef();

  const style_background = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1500,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(41, 41, 41, 0.39)",
  };

  const infoDiv = (
    <>
      <div className={{ style_background }}></div>
      <div className={style.popup} ref={myRef}>
        <img src={inst_1} alt="Instruction" className={style.inst_image} />

        <img src={inst_2} alt="Instruction" className={style.inst_image} />

        <img src={inst_3} alt="Instruction" className={style.inst_image} />

        <img src={inst_4} alt="Instruction" className={style.inst_image} />
      </div>
    </>
  );

  const handleClick = (e) => {
    setContent(!content);
  };

  const styleObjPanel = {};

  const styleObjButton = {};

  const handleMouseClick = (e) => {
    if (!myRef.current) return;

    if (
      !myRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setContent(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseClick);
    return () => {
      document.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);

  return (
    <>
      <button
        onClick={handleClick}
        className={style.button}
        id="panel_button"
        ref={buttonRef}
      >
        ?
      </button>

      <div>{content && infoDiv}</div>
    </>
  );
}
