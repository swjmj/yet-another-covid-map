import React, { useRef, useEffect, useState } from "react";

export default function useToggle() {
  const myRef = useRef(false);
  const [myStyle, setMystyle] = useState(true);

  const handleClick = (e) => {
    if (!myRef.current) return;
    if (myRef.current.contains(e.target)) {
    } else {
      setMystyle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return [myRef, myStyle];
}
