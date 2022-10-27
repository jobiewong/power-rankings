import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import React from "react";

type CardProps = { team: string };

const Card = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: props.id, transition: null });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  // const baseStyles: React.CSSProperties = {
  //   position: "relative",
  // };

  // const initialStyles = {
  //   set: {
  //     x: 0,
  //     y: 0,
  //     scale: 1,
  //   },
  // };

  const baseStyles: React.CSSProperties = {
    position: "relative",
  };

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1,
  };

  const stylesItem = "mb-4 flex h-16 w-full flex-row pl-14";

  return (
    <motion.div
      className={stylesItem}
      style={baseStyles}
      ref={setNodeRef}
      layoutId={props.id}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
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
      {...attributes}
      {...listeners}
    >
      <motion.div
        className={`flex w-full flex-row rounded-sm`}
        style={{
          color: props.team.textCol,
          backgroundColor: props.team.bgCol,
        }}
        animate={
          transform
            ? {
                boxShadow: isDragging
                  ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(0, 0, 0, 0.25)"
                  : undefined,
              }
            : initialStyles
        }
        transition={{
          duration: !isDragging ? 0.25 : 0,
          easings: {
            type: "spring",
          },
        }}
        {...attributes}
        {...listeners}
      >
        <div className="flex h-full w-16 flex-col items-center justify-center rounded-l-sm bg-zinc-400">
          logo
        </div>
        <div className="flex items-center px-4 text-2xl font-black uppercase">
          {props.team.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
