import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import initialTeams from "../data/initial-data.mjs";
import Card from "./Card";

const RankingsList = () => {
  const teamsInfo = initialTeams.teams;

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {initialTeams.columns["list-main"].teamIds.map((teamId, index) => (
              <Draggable key={teamId} draggableId={teamId} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card key={teamId} team={teamsInfo[teamId]} index={index} />
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
