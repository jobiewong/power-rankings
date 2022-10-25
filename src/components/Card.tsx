import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type CardProps = { team: string };

const Card = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(props.team.bgCol);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 flex h-16 w-full flex-row pl-14"
    >
      <div
        className={`flex w-full flex-row rounded-sm`}
        style={{
          color: props.team.textCol,
          backgroundColor: props.team.bgCol,
        }}
      >
        <div className=" flex h-full w-16 flex-col items-center justify-center bg-zinc-400">
          logo
        </div>
        <div className="flex items-center px-4 text-2xl font-black uppercase">
          {props.team.name}
        </div>
      </div>
    </div>
  );
};

export default Card;
