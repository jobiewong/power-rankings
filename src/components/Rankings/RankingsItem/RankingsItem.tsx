import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import * as React from "react";
import type { ExampleData } from "~/types/datatypes";

const RankingsItem = React.forwardRef<HTMLDivElement, { data: ExampleData }>(
  function RankingsItem({ data }, ref) {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
      id: data.uuid,
      transition: { duration: 750, easing: "ease" },
    });

    return (
      <motion.li
        className="relative z-10 flex w-full overflow-hidden text-white"
        ref={setNodeRef}
        animate={{ opacity: isDragging ? 0.3 : 1 }}
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
