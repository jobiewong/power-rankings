import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import OverflowGrid from "~/components/Rankings/OverflowGrid";
import RankingsGrid from "~/components/Rankings/RankingsGrid";
import type { ExampleData, ListData } from "~/types/datatypes";
import { findItem, generateData } from "~/utils/utils";

function Rankings() {
  const [data, setData] = useState<ExampleData[]>([]);
  const [listData, setListData] = useState<ListData>({
    root: [],
    overflow: [],
  });
  const [activeId, setActiveId] = useState<string | null>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
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

    // Find the containers
    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId as string);
    console.log(activeContainer, overContainer, active, over);

    if (!activeContainer || !overContainer) {
      return;
    }

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
    setData(generateData(15));
  }, []);

  useEffect(() => {
    const listData = data.map((item) => item.uuid).slice(0, 10);
    console.log("🚀 - file: index.tsx:147 - useEffect - listData: ", listData);
    const overflowData = data.map((item) => item.uuid).slice(10, 15);
    console.log(
      "🚀 - file: index.tsx:149 - useEffect - overflowData: ",
      overflowData,
    );
    setListData({ root: listData, overflow: overflowData });
  }, [data]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mt-8 w-full space-y-4 px-8 md:w-[48rem] md:space-y-10 md:px-0">
        <RankingsGrid data={data} listItems={listData.root} />
        <OverflowGrid data={data} items={listData.overflow} />
      </div>
      <DragOverlay
        dropAnimation={{
          ...defaultDropAnimation,
          duration: 750 / 2,
        }}
      >
        {activeId ? (
          <DragOverlayItem data={findItem(data, activeId)} height={56} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Rankings;

function DragOverlayItem({
  data,
  height,
}: {
  data: ExampleData | undefined;

  height: number;
}) {
  if (data === undefined) return null;
  return (
    <motion.li
      className="z-10 flex w-full text-white"
      style={{ height: height }}
    >
      <div className="pointer-events-none aspect-square h-full" />
      <div className="aspect-square h-full bg-red-500" />
      <div
        className="w-full p-4"
        style={{
          backgroundColor: data.backgroundColour,
        }}
      >
        {data.name}
      </div>
    </motion.li>
  );
}
