import React, { useEffect, useState } from "react";
import initialTeams from "../data/initial-data.mjs";

export const DataContext = React.createContext([]);

export function DataList(props: any) {
  const items = Object.keys(initialTeams.teams).map((key) => {
    return initialTeams.teams[key];
  });
  const [data, setData] = useState(items);
  // console.log(typeof data);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
}
