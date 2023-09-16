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

    return (
      <motion.li
        className="relative z-10 flex w-full text-white"
        ref={setNodeRef}
        style={{ opacity: isDragging ? 0 : 1 }}
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

export function DragOverlayItem({
  data,
  height,
}: {
  data: ExampleData | undefined;
  height: number;
}) {
  if (data === undefined) return;
  return (
    <motion.li
      className="z-10 flex w-full text-white"
      style={{ height: height }}
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
    </motion.li>
  );
}
