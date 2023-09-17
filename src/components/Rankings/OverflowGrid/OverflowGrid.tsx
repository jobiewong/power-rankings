import {
  SortableContext,
  rectSortingStrategy,
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
  return (
    <SortableContext id="overflow" items={items} strategy={rectSortingStrategy}>
      <div className="preview flex w-full justify-start space-x-2 p-4">
        {items.length < 1 && <p className="text-white/10">Overflow Items</p>}
        {items.map((item) => {
          const dataItem = findItem(data, item);
          return <OverflowItem key={item} id={item} item={dataItem} />;
        })}
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
    <motion.div
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
    ></motion.div>
  );
}
