import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../data/Context";
import initialTeams from "../data/initial-data.mjs";
import Card from "./Card";

const RankingsList = () => {
  const [data, setData] = useContext(DataContext);

  const handleEnd = (result: any) => {
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((team: any, index: string) => (
              <Draggable key={team.id} draggableId={team.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card key={team.id} team={team} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RankingsList;
