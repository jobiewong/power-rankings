import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { teamProps } from "../data/team-type";
import Card from "./Card";

const RankingsList = (props: any) => {
  return (
    <div>
      <SortableContext
        items={props.array}
        strategy={verticalListSortingStrategy}
      >
        {props.dataObj.map((team: teamProps) => (
          <Card key={team.id} id={team.id} team={team} />
        ))}
      </SortableContext>
    </div>
  );
};

export default RankingsList;
