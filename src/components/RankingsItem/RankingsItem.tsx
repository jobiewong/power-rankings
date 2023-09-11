import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as React from "react";
import type { ExampleData } from "~/types/datatypes";

const RankingsItem = React.forwardRef<HTMLLIElement, { data: ExampleData }>(
  function RankingsItem({ data }, ref) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: data.uuid });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <li
        className="z-10 flex w-full text-white"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="pointer-events-none aspect-square h-full" />
        <div className="aspect-square h-full bg-red-500" />
        <div
          className="w-full p-4"
          style={{
            backgroundColor: data.backgroundColour,
          }}
        >
          {data.name}
        </div>
      </li>
    );
  },
);

export default RankingsItem;
