import React, { createContext, useEffect, useState } from "react";
import initialTeams from "./initial-data";
import teamData from "./team-data";

type teamProps = {
  id: string;
  name: string;
  bgCol: string;
  textCol: string;
};

export const DataContext = createContext<any[] | null>(null);

export function DataList(props: any) {
  // map team objects from team data using keys from initial teams
  const items = initialTeams.teams.reduce(function (obj, key) {
    if (teamData.teams.hasOwnProperty(key)) obj[key] = teamData.teams[key];
    return obj;
  }, {});

  // deconstruct objects
  const itemsArray = Object.keys(items).map((key) => {
    return items[key];
  });

  // define data state
  const [data, setData] = useState<any>(itemsArray);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
}
