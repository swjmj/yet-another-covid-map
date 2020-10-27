import React, { useState, createContext } from "react";
import useFetch from "./hooks/fetchhook";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const { loading, data, error } = useFetch();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}
