import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { relative } from "path";
import * as React from "react";
import type { ExampleData } from "~/types/datatypes";

const RankingsItem = React.forwardRef<HTMLDivElement, { data: ExampleData }>(
  function RankingsItem({ data }, ref) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: data.uuid });

    const initialStyles = {
      x: 0,
      y: 0,
      scale: 1,
    };

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <motion.li
        className="z-10 flex w-full text-white"
        ref={setNodeRef}
        // style={style}
        style={{ position: "relative" }}
        layoutId={data.uuid}
        transition={{
          type: "spring",
          damping: 15,
        }}
        {...attributes}
        {...listeners}
      >
        <div ref={ref} className="pointer-events-none aspect-square h-full" />
        <div className="aspect-square h-full bg-red-500" />
        <div
          className="w-full p-4"
          style={{
            backgroundColor: data.backgroundColour,
          }}
        >
          {data.name}
        </div>
      </motion.li>
    );
  },
);

export default RankingsItem;
