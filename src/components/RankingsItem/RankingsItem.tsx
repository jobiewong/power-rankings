import * as React from "react";

interface Props {
  id: string;
  name: string;
  textColour: string;
  backgroundColour: string;
}

function RankingsItem({ data }: { data: Props }) {
  return (
    <div
      className="flex w-full"
      style={{
        color: "white",
        backgroundColor: data.backgroundColour,
      }}
    >
      <div className="aspect-square h-full bg-red-500" />
      <div className="p-4">{data.name}</div>
    </div>
  );
}

export default RankingsItem;
