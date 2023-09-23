import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import OverflowGrid from "~/components/Rankings/OverflowGrid";
import RankingsGrid from "~/components/Rankings/RankingsGrid";
import type {
  ExampleData,
  ListData,
  OverflowBehaviour,
} from "~/types/datatypes";
import { findItem, generateData } from "~/utils/utils";

function Rankings() {
  const [listLength, setListLength] = useState(10);
  const [overflowBehaviour, setflowBehaviour] =
    useState<OverflowBehaviour>("displace");

  const [data, setData] = useState<ExampleData[]>([]);
  const [listData, setListData] = useState<ListData>({
    root: [],
    overflow: [],
    tierBreaks: [],
  });
  const [activeId, setActiveId] = useState<string | null>();
  const [activeContainer, setActiveContainer] = useState<string>("");
  const [gridDimensions, setGridDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 56, height: 56 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function findContainer(id: string) {
    if (id in listData) {
      return id;
    }

    return Object.keys(listData).find((key) =>
      listData[key as keyof typeof listData].includes(id),
    );
  }

  function handleDragMove(event: DragEndEvent) {
    const { active, over } = event;
    const id = active.id;
    const overId = over?.id;

    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer) {
      return;
    }

    setActiveContainer(overContainer);

    if (over !== null) {
      setListData((prev) => {
        const sameContainer = activeContainer === overContainer;

        const activeItems = prev[activeContainer as keyof typeof prev];
        const overItems = prev[overContainer as keyof typeof prev];
        const activeIndex = activeItems.indexOf(id as string);
        const overIndex = overItems.indexOf(overId as string);

        if (activeIndex === overIndex && sameContainer) {
          return prev;
        }

        if (sameContainer) {
          return {
            ...prev,
            [activeContainer]: arrayMove(
              prev[activeContainer as keyof typeof prev],
              activeIndex,
              overIndex,
            ),
          };
        } else {
          const newActiveItems = [...activeItems];
          newActiveItems.splice(activeIndex, 1);
          const newOverItems = [...overItems];
          newOverItems.splice(overIndex, 0, id as string);

          if (overContainer === "root" && newOverItems.length > listLength) {
            if (overflowBehaviour === "displace") {
              const displaced = newOverItems.pop();
              if (displaced) {
                newActiveItems.push(displaced);
              }
            }
          }

          return {
            ...prev,
            [activeContainer]: newActiveItems,
            [overContainer]: newOverItems,
          };
        }
      });
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  useEffect(() => {
    setData(generateData(10));
  }, []);

  useEffect(() => {
    const rootData = data.map((item) => item.uuid).slice(0, 10);
    console.log("🚀 - file: index.tsx:147 - useEffect - listData: ", listData);
    const overflowData = data.map((item) => item.uuid).slice(10, 15);
    console.log(
      "🚀 - file: index.tsx:149 - useEffect - overflowData: ",
      overflowData,
    );

    const tierBreakInit = Array.from({ length: listLength }, () => "0");

    setListData({
      root: rootData,
      overflow: overflowData,
      tierBreaks: tierBreakInit,
    });
  }, [data]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragOver={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mt-8 w-full space-y-4 px-8 md:w-[48rem] md:space-y-12 md:px-0">
        <RankingsGrid
          data={data}
          listData={listData}
          setListData={setListData}
          listLength={listLength}
          setGridDimensions={setGridDimensions}
          gridDimensions={gridDimensions}
        />
        <OverflowGrid data={data} items={listData.overflow} />
      </div>
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <DragOverlayItem
            data={findItem(data, activeId)}
            dimensions={gridDimensions}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Rankings;

function DragOverlayItem({
  data,
  dimensions,
}: {
  data: ExampleData | undefined;
  dimensions: { width: number; height: number };
}) {
  if (data === undefined) return null;
  return (
    <motion.div
      className="z-10 flex text-white"
      style={{
        height: dimensions.height,
        width: dimensions.width + dimensions.height,
      }}
    >
      <div className="pointer-events-none aspect-square h-full" />
      <motion.div
        className="aspect-square h-full"
        style={{
          backgroundColor: data.backgroundColour,
        }}
      />
      <div className="w-full whitespace-nowrap bg-stone-600 p-4">
        {data.name}
      </div>
    </motion.div>
  );
}
