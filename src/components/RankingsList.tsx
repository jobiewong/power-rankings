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
import React, { useContext } from "react";
import { DataContext } from "../data/Context";
import Card from "./Card";

const RankingsList = () => {
  const [data, setData] = useContext(DataContext);

  const teamArray = Object.keys(data).map((key) => {
    return data[key].id;
  });

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
        // update Data with new array order
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
