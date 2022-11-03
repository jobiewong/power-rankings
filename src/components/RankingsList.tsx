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
    <div className="">
      <SortableContext
        id={id}
        items={array}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="grid h-96 grid-flow-col grid-cols-2 grid-rows-5"
        >
          {dataObj.map((team: teamProps) => (
            <Card key={team.id} id={team.id} team={team} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default RankingsList;
