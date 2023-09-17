import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { useMeasure } from "react-use";
import RankingsItem from "~/components/Rankings/RankingsItem";
import type { ExampleData } from "~/types/datatypes";
import { findItem } from "~/utils/utils";

function RankingsGrid({
  listLength,
  data,
  listItems,
}: {
  listLength: number;
  data: ExampleData[];
  listItems: string[];
}) {
  const [gridDimensions, setGridDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 56, height: 56 });
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    setGridDimensions({ width, height });
  }, [width, height]);

  if (data === undefined) return <div></div>;
  else {
    return (
      <div className="relative">
        <div className="absolute grid w-full grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] gap-x-6 gap-y-4 md:grid-cols-2 md:grid-rows-5">
          {listLength > 0 &&
            [...Array(listLength).keys()].map((rank) => {
              return (
                <GridNumber
                  key={rank}
                  rank={rank}
                  dimensions={gridDimensions}
                />
              );
            })}
        </div>
        <SortableContext
          id="root"
          items={listItems}
          strategy={rectSortingStrategy}
        >
          <ul className="grid grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] gap-x-8 gap-y-4 md:grid-cols-2 md:grid-rows-5">
            {listItems.map((itemId) => {
              const itemData = findItem(data, itemId);
              if (itemData === undefined) return;
              return <RankingsItem data={itemData} key={itemId} ref={ref} />;
            })}
          </ul>
        </SortableContext>
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
        {rank + 1}
      </div>
    </div>
  );
}
