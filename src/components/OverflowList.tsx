import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import React, { useContext } from "react";
import { DataContext } from "../data/Context";
import { teamProps } from "../data/team-type";
import Card from "./Card";

interface Props {
  children: React.ReactNode;
  dragging: boolean;
  id: string;
}

const OverflowList = ({ children, id, dragging }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div>
      <div className="relative mt-8 flex w-full flex-col items-center justify-center">
        <div
          className={clsx(
            "duration-125 flex h-16 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-white/30 capitalize transition-all ease-in",
            {
              "bg-white/10": dragging,
              "": !dragging,
            }
          )}
          ref={setNodeRef}
          aria-label="Droppable region"
        >
          {children}
        </div>
        <div className="duration-125 mt-4 cursor-pointer text-white opacity-30 transition-all ease-in-out hover:opacity-100">
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default OverflowList;

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
