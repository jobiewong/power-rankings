import React from "react";
import { useMeasure } from "react-use";
import RankingsItem from "~/components/RankingsItem";
import type { ExampleData } from "~/types/datatypes";
import { generateData } from "~/utils/utils";

function RankingsGrid() {
  const [data, setData] = React.useState<ExampleData[]>([]);
  const [gridDimensions, setGridDimensions] = React.useState<{
    width: number;
    height: number;
  }>({ width: 56, height: 56 });
  const [ref, { x, y, width, height, top, right, bottom, left }] =
    useMeasure<HTMLLIElement>();

  React.useEffect(() => {
    setData(generateData(10));
  }, []);

  React.useEffect(() => {
    setGridDimensions({ width, height });
  }, [width, height]);

  if (data === undefined) return <div></div>;
  else {
    return (
      <div className="relative">
        <div className="absolute grid w-full grid-flow-col grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
          {data.map((item, ci) => (
            <GridNumber key={ci} rank={ci} dimensions={gridDimensions} />
          ))}
        </div>
        <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-8 gap-y-4">
          {data.map((item, ci) => {
            if (ci === 0)
              return <RankingsItem key={item.uuid} data={item} ref={ref} />;
            else {
              return <RankingsItem key={item.uuid} data={item} />;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default RankingsGrid;

function GridNumber({
  rank,
  dimensions,
}: {
  rank: number;
  dimensions: { width: number; height: number };
}) {
  return (
    <div
      className="w-full text-2xl font-bold text-white"
      style={{ height: dimensions.height }}
    >
      <div
        className="flex aspect-square items-center justify-center"
        style={{ width: dimensions.height }}
      >
        {rank}
      </div>
    </div>
  );
}
