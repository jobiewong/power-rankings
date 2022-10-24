import React, { useContext, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DataContext } from "../data/Context";
import initialTeams from "../data/initial-data.mjs";
import Card from "./Card";
import { SortableItem } from "./SortableItem";

const RankingsList = () => {
  const [data, setData] = useContext(DataContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((data) => {
        const oldIndex = data.indexOf(active.id);
        const newIndex = data.indexOf(over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleEnd}
    >
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        {data.map((team: any, index: string) => (
          <Card key={team.id} team={team} id={index} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default RankingsList;
