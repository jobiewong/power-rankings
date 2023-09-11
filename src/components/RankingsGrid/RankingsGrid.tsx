import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { useMeasure } from "react-use";
import RankingsItem from "~/components/RankingsItem";
import type { ExampleData } from "~/types/datatypes";
import { findItem, generateData } from "~/utils/utils";

function RankingsGrid() {
  const [data, setData] = React.useState<ExampleData[]>([]);
  const [dataIds, setDataIds] = React.useState<string[]>([]);
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id && over !== null) {
      setDataIds((data) => {
        const oldIndex = data.findIndex((item) => item === active.id);
        const newIndex = data.findIndex((item) => item === over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  React.useEffect(() => {
    setData(generateData(10));
  }, []);

  React.useEffect(() => {
    console.log(data.map((item) => item.name));
    setDataIds(data.map((item) => item.uuid));
  }, [data]);

  React.useEffect(() => {
    setGridDimensions({ width, height });
  }, [width, height]);

  if (data === undefined) return <div></div>;
  else {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="relative">
          <div className="absolute grid w-full grid-flow-col grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
            {data.map((item, ci) => (
              <GridNumber key={ci} rank={ci} dimensions={gridDimensions} />
            ))}
          </div>
          <SortableContext items={dataIds} strategy={rectSortingStrategy}>
            <ul className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-8 gap-y-4">
              {dataIds.map((item, ci) => {
                const itemData = findItem(data, item);
                if (itemData === undefined) return;
                return <RankingsItem data={itemData} key={item} ref={ref} />;
              })}
            </ul>
          </SortableContext>
        </div>
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
