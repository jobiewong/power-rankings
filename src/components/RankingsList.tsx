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

  const teamArray = Object.keys(data).map((key) => {
    return data[key].id;
  });

  console.log(teamArray);
  console.log(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((currData) => {
        const oldIndex = teamArray.indexOf(active.id);
        const newIndex = teamArray.indexOf(over.id);

        const modifiedArray = arrayMove(teamArray, oldIndex, newIndex);

        const sorted = [...currData].sort(
          (a, b) => modifiedArray.indexOf(a.id) - modifiedArray.indexOf(b.id)
        );

        return sorted;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleEnd}
    >
      <SortableContext items={teamArray} strategy={verticalListSortingStrategy}>
        {data.map((team) => (
          <Card key={team.id} id={team.id} team={team} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default RankingsList;
