import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import * as React from "react";
import type { ExampleData } from "~/types/datatypes";
import { cn, findItem } from "~/utils/utils";

function OverflowGrid({
  data,
  items,
}: {
  data: ExampleData[];
  items: string[];
}) {
  const { setNodeRef } = useDroppable({
    id: "overflow",
  });

  return (
    <SortableContext
      id="overflow"
      items={items}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex min-h-[8rem] w-full flex-col border-2 border-dashed border-white/10 p-4">
        <ul ref={setNodeRef} className="flex w-full justify-center space-x-2">
          {items.map((item) => {
            const dataItem = findItem(data, item);
            return <OverflowItem key={item} id={item} item={dataItem} />;
          })}
        </ul>
        {items.length === 0 && (
          <div className="flex grow items-center justify-center">
            <p className="text-white text-opacity-30">Overflow Container</p>
          </div>
        )}
      </div>
    </SortableContext>
  );
}

export default OverflowGrid;

function OverflowItem({
  item,
  id,
}: {
  item: ExampleData | undefined;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: id,
    transition: { duration: 750, easing: "ease" },
  });
  return (
    <motion.li
      ref={setNodeRef}
      className={cn("aspect-square w-20 rounded-sm bg-red-500 2xl:w-24")}
      style={{ backgroundColor: item?.backgroundColour }}
      animate={{ opacity: isDragging ? 0.3 : 1 }}
      layoutId={item?.uuid}
      transition={{
        type: "spring",
        damping: 15,
      }}
      {...attributes}
      {...listeners}
    ></motion.li>
  );
}
