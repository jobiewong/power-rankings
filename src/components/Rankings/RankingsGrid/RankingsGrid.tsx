import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useMeasure } from "react-use";
import RankingsItem from "~/components/Rankings/RankingsItem";
import type { ExampleData, ListData, SetState } from "~/types/datatypes";
import { cn, findItem } from "~/utils/utils";

function RankingsGrid({
  listLength,
  data,
  listData,
  setListData,
  gridDimensions,
  setGridDimensions,
}: {
  listLength: number;
  data: ExampleData[];
  listData: ListData;
  setListData: SetState<ListData>;
  gridDimensions: { width: number; height: number };
  setGridDimensions: SetState<{ width: number; height: number }>;
}) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    console.log("🚀 - file: RankingsGrid.tsx:26 - width: ", height);

    setGridDimensions({ width, height });
  }, [width, height]);

  const { setNodeRef } = useDroppable({
    id: "root",
  });

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
        <div className="absolute grid h-full w-full grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] items-end gap-x-6 gap-y-4 md:grid-cols-2 md:grid-rows-5">
          {listData.tierBreaks.map((item, ci) => {
            return (
              <div
                key={ci}
                className="relative flex h-4 w-full translate-x-4 translate-y-4 items-center py-1"
              >
                <motion.div
                  className={
                    "group absolute right-0 top-0 flex h-full w-[90%] cursor-pointer items-center"
                  }
                  onClick={() => {
                    const current = listData.tierBreaks[ci];
                    setListData((prev) => {
                      const newListData = { ...prev };
                      newListData.tierBreaks[ci] = current === "1" ? "0" : "1";
                      return newListData;
                    });
                  }}
                  initial={"initial"}
                  whileHover={
                    listData.tierBreaks[ci] === "1" ? "active" : "hover"
                  }
                  animate={
                    listData.tierBreaks[ci] === "1" ? "active" : "initial"
                  }
                >
                  <motion.div
                    className={cn(
                      "triangle relative h-[.125rem] w-full bg-white after:border-r-white",
                    )}
                    variants={{
                      initial: { x: 20, opacity: 0 },
                      hover: {
                        x: 20,
                        opacity: 1,
                      },
                      active: { x: 0, opacity: 1 },
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
        <SortableContext
          id="root"
          items={listData.root}
          strategy={rectSortingStrategy}
        >
          <ul
            ref={setNodeRef}
            className="grid grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] gap-x-8 gap-y-4 md:grid-cols-2 md:grid-rows-5"
          >
            {listData.root.map((itemId) => {
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
        {rank === 0 && <Underline colour="#CBAE39" iter={rank} />}
        {rank === 1 && <Underline colour="#D8D8D8" iter={rank} />}
        {rank === 2 && <Underline colour="#AC8A61" iter={rank} />}
      </div>
    </div>
  );
}

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 25,
    transition: { delay: custom * 0.2, damping: 5, type: "spring" },
  }),
};

function Underline(props: { colour: string; iter: number }) {
  const colour = props.colour;

  return (
    <motion.div
      className="absolute flex translate-y-6 flex-col items-center"
      variants={variants}
      custom={props.iter}
      initial={"hidden"}
      animate={"visible"}
      transition={{
        delay: 200,
      }}
    >
      <div
        className={`mb-1 h-[.2rem] w-8`}
        style={{ backgroundColor: colour }}
      />
      <div className={`h-[.2rem] w-5`} style={{ backgroundColor: colour }} />
    </motion.div>
  );
}
