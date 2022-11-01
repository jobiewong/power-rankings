import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { teamProps } from "../data/team-type";
import Card from "./Card";

const RankingsList = (props: any) => {
  const { id, array, dataObj } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div>
      <SortableContext
        id={id}
        items={array}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {dataObj.map((team: teamProps) => (
            <Card key={team.id} id={team.id} team={team} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default RankingsList;
