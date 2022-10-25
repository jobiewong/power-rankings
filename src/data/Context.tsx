import React, { useEffect, useState } from "react";
import initialTeams from "../data/initial-data.mjs";
import teamData from "../data/team-data.mjs";

export const DataContext = React.createContext([]);

type team = {
  id: string;
  name: string;
  bgCol: string;
  textCol: string;
};

export function DataList(props: any) {
  // map team objects from team data using keys from initial teams
  const items = initialTeams.teams.reduce(function (obj, key) {
    if (teamData.teams.hasOwnProperty(key)) obj[key] = teamData.teams[key];
    return obj;
  }, {});

  console.log(items, "items");

  // deconstruct objects
  const itemsArray = Object.keys(items).map((key) => {
    return items[key];
  });

  // define data state
  const [data, setData] = useState(itemsArray);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
}
