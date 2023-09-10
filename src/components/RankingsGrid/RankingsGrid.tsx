import React from "react";
import RankingsItem from "~/components/RankingsItem";
import { generateData } from "~/utils/utils";

function RankingsGrid() {
  const data = generateData(10);

  return (
    <div className="preview grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-8 gap-y-4">
      {data.map((item) => (
        <RankingsItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default RankingsGrid;
