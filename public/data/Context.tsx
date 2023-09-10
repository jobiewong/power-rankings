import React, { createContext, useEffect, useState } from "react";
import initialTeams from "./initial-data";
import teamData from "./team-data";

export const DataContext = createContext<any[] | null>(null);

export function DataList(props: any) {
  // map team objects from team data using keys from initial teams
  const items = initialTeams.teams.reduce(function (obj, key) {
    if (teamData.teams.hasOwnProperty(key)) obj[key] = teamData.teams[key];
    return obj;
  }, {});

  const overflowItems = initialTeams.overflow.reduce(function (obj, key) {
    if (teamData.teams.hasOwnProperty(key)) obj[key] = teamData.teams[key];
    return obj;
  }, {});

  // deconstruct objects
  const itemsArray = Object.keys(items).map((key) => {
    return items[key];
  });
  const overflowArray = Object.keys(overflowItems).map((key) => {
    return overflowItems[key];
  });

  const totalItems = {
    main: itemsArray,
    overflow: overflowArray,
  };
  // console.log(initialTeams.overflow);

  // define data state
  const [data, setData] = useState<any>(totalItems);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
}
