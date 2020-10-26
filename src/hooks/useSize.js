import { useRef, useEffect, useState } from "react";

export default function useSize() {
  const myRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (myRef.current) {
      setWidth(myRef.current.clientWidth);
      setHeight(myRef.current.clientHeight);
    }
  });

  return [myRef, width, height];
}
