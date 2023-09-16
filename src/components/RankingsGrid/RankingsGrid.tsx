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
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useMeasure } from "react-use";
import RankingsItem from "~/components/RankingsItem";
import type { ExampleData, SetState } from "~/types/datatypes";
import { findItem } from "~/utils/utils";

function RankingsGrid({
  data,
  listItems,
  setListItems,
}: {
  data: ExampleData[];
  listItems: string[];
  setListItems: SetState<string[]>;
}) {
  const [activeId, setActiveId] = React.useState<string | null>();

  const [gridDimensions, setGridDimensions] = React.useState<{
    width: number;
    height: number;
  }>({ width: 56, height: 56 });
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  function handleDragMove(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id && over !== null) {
      setListItems((data) => {
        const oldIndex = data.findIndex((item) => item === active.id);
        const newIndex = data.findIndex((item) => item === over.id);

        return arrayMove(data, oldIndex, newIndex);
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
    setGridDimensions({ width, height });
  }, [width, height]);

  if (data === undefined) return <div></div>;
  else {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragMove}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative">
          <div className="absolute grid w-full grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] gap-x-6 gap-y-4 md:grid-cols-2 md:grid-rows-5">
            {data.map((item, ci) => (
              <GridNumber key={ci} rank={ci} dimensions={gridDimensions} />
            ))}
          </div>
          <SortableContext items={listItems} strategy={rectSortingStrategy}>
            <ul className="grid grid-flow-col grid-cols-1 grid-rows-[repeat(10,_minmax(0,1fr))] gap-x-8 gap-y-4 md:grid-cols-2 md:grid-rows-5">
              {listItems.map((itemId) => {
                const itemData = findItem(data, itemId);
                if (itemData === undefined) return;
                return <RankingsItem data={itemData} key={itemId} ref={ref} />;
              })}
            </ul>
          </SortableContext>
        </div>
        <DragOverlay
          dropAnimation={{
            ...defaultDropAnimation,
            duration: 750 / 2,
          }}
        >
          {activeId ? (
            <DragOverlayItem data={findItem(data, activeId)} height={height} />
          ) : null}
        </DragOverlay>
      </DndContext>
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
