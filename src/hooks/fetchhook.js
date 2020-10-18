import React, { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!uri) return;
    setLoading(true);
    fetch("https://api.covid19api.com/summary", { method: "GET" })
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  return { loading, data, error };
}
