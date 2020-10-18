import React from "react";
import useFetch from "./hooks/fetchhook";

export default function Info() {
  const { loading, data, error } = useFetch();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  return (
    <div>
      {data.Countries.map((country, i) => (
        <div key={i}>
          <h3>Country: {country.Country}</h3>
          <p>TotalConfirmed: {country.TotalConfirmed}</p>
          <p>TotalDeaths: {country.TotalDeaths}</p>
          <p>TotalRecovered: {country.TotalRecovered}</p>
        </div>
      ))}
    </div>
  );
}
