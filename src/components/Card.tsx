import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import React from "react";

type CardProps = { team: string };

const Card = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: null,
  };

  const baseStyles: React.CSSProperties = {
    position: "relative",
    width: 140,
    height: 140,
  };

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 flex h-16 w-full flex-row pl-14"
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
                : undefined,
            }
          : initialStyles
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: "spring",
        },
        scale: {
          duration: 0.25,
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25,
        },
      }}
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
    </motion.div>
  );
};

export default Card;
